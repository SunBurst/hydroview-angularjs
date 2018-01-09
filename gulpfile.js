'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var glob = require('glob');
var gulpif = require('gulp-if');
var gulpjshint = require('gulp-jshint');
var gulpjscs = require('gulp-jscs');
var gulpNgConfig = require('gulp-ng-config');
var merge = require('merge-stream');
var nodemon = require('gulp-nodemon');
var plato = require('plato');
var plug = require('gulp-load-plugins')();
var gulputil = require('gulp-util');
var del = require('del');
var env = gulputil.env;
var log = gulputil.log;
var port = process.env.PORT || 7203;

var paths = {
  "client": "./src/client/",
  "server": "./src/server/",
  "html": "./src/client/**/*.html",
  "htmltemplates": "./src/client/app/**/*.html",
  "css": "./src/client/content/style.css",
  "js": [
    "./src/client/app/**/*module*.js",
    "./src/client/app/**/*.js"
  ],
  "specs": [
    "./src/client/test/specs/*.spec.js"
  ],
  "nodejs": [
    "./src/server/**/*.js"
  ],
  "images": [
    "./src/client/content/images/**/*.*"
  ],
  "report": "./report/",
  "build": "./build/"
}; 

gulp.task('config-dev', function() {
  return gulp.src('./envconfig.json')
    .pipe(gulpNgConfig('app.envconfig', {
      environment: 'dev'
    }))
    .pipe(gulp.dest('./src/client/app'));
});

gulp.task('config-build', function() {
  return gulp.src('./envconfig.json')
    .pipe(gulpNgConfig('app.envconfig', {
      environment: 'build'
    }))
    .pipe(gulp.dest('./src/client/app'));
});

gulp.task('clean', function(cb) {
  var delPaths =  [].concat(paths.build);
  del(delPaths, cb);
});

gulp.task('css', function() {
  gulp.src(paths.css) 
    .pipe(plug.concat('all.min.css')) // Before bytediff or after
    .pipe(plug.autoprefixer('last 2 version', '> 5%'))
    .pipe(plug.bytediff.start())
    .pipe(plug.minifyCss({}))
    .pipe(plug.bytediff.stop(bytediffFormatter))
    .pipe(gulp.dest(paths.build + 'content'));
});

gulp.task('hint', function() {
  return gulp.src(paths.JS)
    .pipe(gulpjshint())
    .pipe(gulpjshint.reporter('default'))
    .pipe(gulpjshint.reporter('fail'));
});

gulp.task('images', function() {
  var dest = paths.build + 'content/images';
  log('Compressing, caching, and copying images');
  return gulp
    .src(paths.images)
    .pipe(plug.cache(plug.imagemin({
      optimizationLevel: 3
    })))
    .pipe(gulp.dest(dest));
});

gulp.task('js', ['config-build', 'analyze', 'templatecache'], function() {
  log('Bundling, minifying, and copying the app\'s JavaScript');

  var source = [].concat(paths.js, paths.build + 'templates.js');
  return gulp
    .src(source)
    // .pipe(plug.sourcemaps.init()) // get screwed up in the file rev process
    .pipe(plug.concat('all.min.js'))
    .pipe(plug.ngAnnotate({
      add: true,
      single_quotes: true
    }))
    .pipe(plug.bytediff.start())
    .pipe(plug.uglify({
      mangle: true
    }))
    .pipe(plug.bytediff.stop(bytediffFormatter))
    // .pipe(plug.sourcemaps.write('./'))
    .pipe(gulp.dest(paths.build));
});

gulp.task('analyze', function() {
    log('Analyzing source with JSHint, JSCS, and Plato');

    var jshint = analyzejshint([].concat(paths.js, paths.specs, paths.nodejs));
    var jscs = analyzejscs([].concat(paths.js, paths.nodejs));

    startPlatoVisualizer();

    return merge(jshint, jscs);
});

gulp.task('templatecache', function() {
  return gulp
    .src(paths.htmltemplates)
    // .pipe(plug.bytediff.start())
    .pipe(plug.minifyHtml({
      empty: true
    }))
    // .pipe(plug.bytediff.stop(bytediffFormatter))
    .pipe(plug.angularTemplatecache('templates.js', {
       module: 'app.core',
       standalone: false,
       root: 'app/'
     }))
     .pipe(gulp.dest(paths.build));
});

gulp.task('rev-and-inject', ['js', 'css'], function() {
    log('Rev\'ing files and building index.html');

    var minified = paths.build + '**/*.min.*';
    var index = paths.client + 'index.html';
    var minFilter = plug.filter(['**/*.min.*', '!**/*.map']);
    var indexFilter = plug.filter(['index.html']);

    var stream = gulp
        // Write the revisioned files
        .src([].concat(minified, index)) // add all built min files and index.html
        .pipe(minFilter) // filter the stream to minified css and js
        .pipe(plug.rev()) // create files with rev's
        .pipe(gulp.dest(paths.build)) // write the rev files
        .pipe(minFilter.restore()) // remove filter, back to original stream

    // inject the files into index.html
    .pipe(indexFilter) // filter to index.html
    //.pipe(inject('content/vendor.min.css', 'inject-vendor'))
        .pipe(inject('content/all.min.css'))
    //    .pipe(inject('vendor.min.js', 'inject-vendor'))
        .pipe(inject('all.min.js'))
        .pipe(gulp.dest(paths.build)) // write the rev files
    .pipe(indexFilter.restore()) // remove filter, back to original stream

    // replace the files referenced in index.html with the rev'd files
    .pipe(plug.revReplace()) // Substitute in new filenames
    .pipe(gulp.dest(paths.build)) // write the index.html file changes
    .pipe(plug.rev.manifest()) // create the manifest (must happen last or we screw up the injection)
    .pipe(gulp.dest(paths.build)); // write the manifest

    function inject(path, name) {
        var pathGlob = paths.build + path;
        var options = {
            ignorePath: paths.build.substring(1),
            read: false
        };
        if (name) {
            options.name = name;
        }
        return plug.inject(gulp.src(pathGlob), options);
    }
});

gulp.task('build', ['rev-and-inject', 'images'], function() {
    log('Building the optimized app');

    return gulp.src('').pipe(plug.notify({
        onLast: true,
        message: 'Deployed code!'
    }));
});

gulp.task('watch', function() {
    log('Watching all files');

    var css = ['gulpfile.js'].concat(paths.css);
    var images = ['gulpfile.js'].concat(paths.images);
    var js = ['gulpfile.js'].concat(paths.js);

    gulp
        .watch(js, ['js'])
        .on('change', logWatch);

    gulp
        .watch(css, ['css'])
        .on('change', logWatch);

    gulp
        .watch(images, ['images'])
        .on('change', logWatch);

    function logWatch(event) {
        log('*** File ' + event.path + ' was ' + event.type + ', running tasks...');
    }
});

/**
 * serve the dev environment, with debug,
 * and with node inspector
 */
gulp.task('serve-dev-debug', ['config-dev'], function() {
    serve({
        mode: 'dev',
        debug: '--debug'
    });
});

/**
 * serve the dev environment, with debug-brk,
 * and with node inspector
 */
gulp.task('serve-dev-debug-brk', ['config-dev'], function() {
    serve({
        mode: 'dev',
        debug: '--debug-brk'
    });
});

/**
 * serve the dev environment
 */
gulp.task('serve-dev', ['config-dev'], function() {
    serve({
        mode: 'dev'
    });
});

/**
 * serve the build environment
 */
gulp.task('serve-build', ['config-build'], function() {
    serve({
        mode: 'build'
    });
});

gulp.task('serve-stage', ['serve-build'], function() {});

/**
 * Execute JSHint on given source files
 * @param  {Array} sources
 * @param  {String} overrideRcFile
 * @return {Stream}
 */
function analyzejshint(sources, overrideRcFile) {
    var jshintrcFile = overrideRcFile || './.jshintrc';
    log('Running JSHint');
    log(sources);
    return gulp
        .src(sources)
        .pipe(gulpjshint(jshintrcFile))
        .pipe(gulpjshint.reporter('jshint-stylish'));
}

/**
 * Execute JSCS on given source files
 * @param  {Array} sources
 * @return {Stream}
 */
function analyzejscs(sources) {
    log('Running JSCS');
    return gulp
        .src(sources)
        .pipe(gulpjscs('./.jscsrc'));
}

/**
 * Start the node server using nodemon.
 * Optionally start the node debugging.
 * @param  {Object} args - debugging arguments
 * @return {Stream}
 */
function serve(args) {
    var options = {
        script: paths.server + 'app.js',
        delayTime: 1,
        env: {
            'NODE_ENV': args.mode,
            'PORT': port
        },
        watch: [paths.server]
    };
    
    var exec;
    if (args.debug) {
        log('Running node-inspector. Browse to http://localhost:8080/debug?port=5858');
        exec = require('child_process').exec;
        exec('node-inspector');
        options.nodeArgs = [args.debug + '=5858'];
    }

    return nodemon(options)
        .on('start', function() {
            startBrowserSync();
        })
        //.on('change', tasks)
        .on('restart', function() {
            log('restarted!');
            setTimeout(function () {
                browserSync.reload({ stream: false });
            }, 1000);
        });
}

/**
 * Start Plato inspector and visualizer
 */
function startPlatoVisualizer() {
    log('Running Plato');

    var files = glob.sync('./src/client/app/**/*.js');
    var excludeFiles = /\/src\/client\/app\/.*\.spec\.js/;

    var options = {
        title: 'Plato Inspections Report',
        exclude: excludeFiles
    };
    var outputDir = './report/plato';

    var platoCompleted = function(report) {
        var overview = plato.getOverviewReport(report);
        log(overview.summary);
    };

    plato.inspect(files, outputDir, options, platoCompleted);
}

/**
 * Start BrowserSync
 */
function startBrowserSync() {
    if(!env.browserSync || browserSync.active) {
        return;
    }

    log('Starting BrowserSync on port ' + port);
    browserSync({
        port: 3000,
        files: [paths.client + '/**/*.*'],
        ghostMode: { // these are the defaults t,f,t,t
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },
        logLevel: 'debug',
        logPrefix: 'gulp-patterns',
        notify: true,
        reloadDelay: 5000
    });
}

/**
 * Formatter for bytediff to display the size changes after processing
 * @param  {Object} data - byte data
 * @return {String}      Difference in bytes, formatted
 */
function bytediffFormatter(data) {
    var difference = (data.savings > 0) ? ' smaller.' : ' larger.';
    return data.fileName + ' went from ' +
        (data.startSize / 1000).toFixed(2) + ' kB to ' + (data.endSize / 1000).toFixed(2) + ' kB' +
        ' and is ' + formatPercent(1 - data.percent, 2) + '%' + difference;
}

/**
 * Format a number as a percentage
 * @param  {Number} num       Number to format as a percent
 * @param  {Number} precision Precision of the decimal
 * @return {String}           Formatted percentage
 */
function formatPercent(num, precision) {
    return (num * 100).toFixed(precision);
}
