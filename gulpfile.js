/* jshint camelcase:false */
'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');
var browserSync = require('browser-sync');
var glob = require('glob');
var gulpif = require('gulp-if');
var gulpJshint = require('gulp-jshint');
var gulpJscs = require('gulp-jscs');
var gulpNgConfig = require('gulp-ng-config');
var gulpAngularTemplatecache = require('gulp-angular-templatecache');
var gulpRev = require('gulp-rev');
var gulpRevReplace = require('gulp-rev-replace');
var gulpConcat = require('gulp-concat');
var mergeStream = require('merge-stream');
var gulpNodemon = require('gulp-nodemon');
var plato = require('plato');
var gulpInject = require('gulp-inject');
var gulpUtil = require('gulp-util');
var gulpAutoprefixer = require('gulp-autoprefixer');
var gulpBytediff = require('gulp-bytediff');
var gulpCleanCss = require('gulp-clean-css');
var gulpMinifyHtml = require('gulp-minify-html');
var gulpNotify = require('gulp-notify');
var gulpCache = require('gulp-cache');
var gulpImagemin = require('gulp-imagemin');
var gulpNgAnnotate = require('gulp-ng-annotate');
var gulpUglify = require('gulp-uglify');
var gulpSourcemaps = require('gulp-sourcemaps');
var gulpFilter = require('gulp-filter');
var del = require('del');
var env = gulpUtil.env;
var log = gulpUtil.log;
var port = process.env.PORT || 7203;

var paths = {
  "client": "./src/client/",
  "server": "./src/server/",
  "html": "./src/client/**/*.html",
  "htmltemplates": "./src/client/app/**/*.html",
  "vendorcss": [],
  "css": "./src/client/content/style.css",
  "vendorjs": [
    "./bower_components/gmap-clusterer/markerclusterer/src/markerclusterer.js",
    "./bower_components/angular-material-data-table/dist/md-data-table.min.js",
    "./bower_components/angular-material-icons/angular-material-icons.min.js"
  ],
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

/**
 * Create development config
 * @return {Stream}
*/
gulp.task('config-dev', function() {
  return gulp.src('./envconfig.json')
    .pipe(gulpNgConfig('app.envconfig', {
      environment: 'dev'
    }))
    .pipe(gulp.dest('./src/client/app'));
});

/**
 * Create build config
 * @return {Stream}
*/
gulp.task('config-build', function() {
  return gulp.src('./envconfig.json')
    .pipe(gulpNgConfig('app.envconfig', {
      environment: 'build'
    }))
    .pipe(gulp.dest('./src/client/app'));
});

/**
 * Remove all files from the build folder
 * One way to run clean before all tasks is to run
 * from the cmd line: gulp clean && gulp build
 * @return {Stream}
 */
gulp.task('clean', function(cb) {
  var delPaths =  [].concat(paths.build);
  del(delPaths, cb);
});

/**
 * Copy the Vendor JavaScript
 * @return {Stream}
 */
gulp.task('vendorjs', function() {
    log('Bundling, minifying, and copying the Vendor JavaScript');

    return gulp.src(paths.vendorjs)
        .pipe(gulpConcat('vendor.min.js'))
        .pipe(gulpBytediff.start())
        .pipe(gulpUglify())
        .pipe(gulpBytediff.stop(bytediffFormatter))
        .pipe(gulp.dest(paths.build));
});

/**
 * Minify and bundle the CSS
 * @return {Stream}
 */
gulp.task('css', function() {
  gulp.src(paths.css) 
    .pipe(gulpConcat('all.min.css')) // Before bytediff or after
    .pipe(gulpAutoprefixer('last 2 version', '> 5%'))
    .pipe(gulpBytediff.start())
    .pipe(gulpCleanCss({compability: 'ie8'}))
    .pipe(gulpBytediff.stop(bytediffFormatter))
    .pipe(gulp.dest(paths.build + 'content'));
});

/**
 * Minify and bundle the Vendor CSS
 * @return {Stream}
 */
gulp.task('vendorcss', function() {
    log('Compressing, bundling, copying vendor CSS');

    var vendorFilter = gulpFilter(['**/*.css']);

    return gulp.src(paths.vendorcss)
        .pipe(vendorFilter)
        .pipe(gulpConcat('vendor.min.css'))
        .pipe(gulpBytediff.start())
        .pipe(gulpBytediff.stop(bytediffFormatter))
        .pipe(gulp.dest(paths.build + 'content'));
});

/**
 * Compress images
 * @return {Stream}
 */
gulp.task('images', function() {
  var dest = paths.build + 'content/images';
  log('Compressing, caching, and copying images');
  return gulp
    .src(paths.images)
    .pipe(gulpCache(gulpImagemin({
      optimizationLevel: 3
    })))
    .pipe(gulp.dest(dest));
});

/**
 * Minify and bundle the app's JavaScript
 * @return {Stream}
 */
gulp.task('js', ['config-build', 'analyze', 'templatecache'], function() {
  log('Bundling, minifying, and copying the app\'s JavaScript');

  var source = [].concat(paths.js, paths.build + 'templates.js');
  return gulp
    .src(source)
    .pipe(gulpSourcemaps.init()) // get screwed up in the file rev process
    .pipe(gulpConcat('all.min.js'))
    //.pipe(gulpNgAnnotate({
    //  add: true,
    //  single_quotes: true
    //}))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulpBytediff.start())
    .pipe(gulpUglify({
      mangle: true
    }))
    .pipe(gulpBytediff.stop(bytediffFormatter))
    .pipe(gulpSourcemaps.write('./'))
    .pipe(gulp.dest(paths.build));
});

/**
 * Lint the code, create coverage report, and a visualizer
 * @return {Stream}
 */
gulp.task('analyze', function() {
    log('Analyzing source with JSHint, JSCS, and Plato');

    var jshint = analyzejshint([].concat(paths.js, paths.specs, paths.nodejs));
    var jscs = analyzejscs([].concat(paths.js, paths.nodejs));

    startPlatoVisualizer();

    return mergeStream(jshint, jscs);
});

/**
 * Create $templateCache from the html templates
 * @return {Stream}
 */
gulp.task('templatecache', function() {
  return gulp
    .src(paths.htmltemplates)
    // .pipe(gulpBytediff.start())
    .pipe(gulpMinifyHtml({
      empty: true
    }))
    // .pipe(gulpBytediff.stop(bytediffFormatter))
    .pipe(gulpAngularTemplatecache('templates.js', {
       module: 'app.core',
       standalone: false,
       root: 'app/'
     }))
     .pipe(gulp.dest(paths.build));
});

/**
 * Inject all the files into the new index.html
 * rev, but no map
 * @return {Stream}
 */
gulp.task('rev-and-inject', ['js', 'vendorjs', 'css', 'vendorcss'], function() {
    log('Rev\'ing files and building index.html');

    var minified = paths.build + '**/*.min.*';
    var index = paths.client + 'index.html';
    var minFilter = gulpFilter(['**/*.min.*', '!**/*.map']);
    var indexFilter = gulpFilter(['index.html']);

    var stream = gulp
        // Write the revisioned files
        .src([].concat(minified, index)) // add all built min files and index.html
        .pipe(minFilter) // filter the stream to minified css and js
        .pipe(gulpRev()) // create files with rev's
        .pipe(gulp.dest(paths.build)) // write the rev files
        //.pipe(minFilter.restore) // remove filter, back to original stream

    // inject the files into index.html
    .pipe(indexFilter) // filter to index.html
    .pipe(inject('content/vendor.min.css', 'inject-vendor'))
        .pipe(inject('content/all.min.css'))
        .pipe(inject('vendor.min.js', 'inject-vendor'))
        .pipe(inject('all.min.js'))
        .pipe(gulp.dest(paths.build)) // write the rev files
//    .pipe(indexFilter.restore) // remove filter, back to original stream

    // replace the files referenced in index.html with the rev'd files
    .pipe(gulpRevReplace()) // Substitute in new filenames
    .pipe(gulp.dest(paths.build)) // write the index.html file changes
    .pipe(gulpRev.manifest()) // create the manifest (must happen last or we screw up the injection)
    .pipe(gulp.dest(paths.build)); // write the manifest

    function inject(path, name) {
        var pathGlob = paths.build + path;
        var options = {
            ignorePath: paths.build.substring(1)
            //read: false
        };
        if (name) {
            options.name = name;
        }
        return gulpInject(gulp.src(pathGlob), options);
    }
});

/**
 * Build the optimized app
 * @return {Stream}
 */
gulp.task('build', ['rev-and-inject', 'images'], function() {
    log('Building the optimized app');

    return gulp.src('').pipe(gulpNotify({
        onLast: true,
        message: 'Deployed code!'
    }));
});

/**
 * Watch files and build
 */
gulp.task('watch', function() {
    log('Watching all files');

    var css = ['gulpfile.js'].concat(paths.css);
    var images = ['gulpfile.js'].concat(paths.images);
    var js = ['gulpfile.js'].concat(paths.js);

    gulp
        .watch(js, ['js', 'vendorjs'])
        .on('change', logWatch);

    gulp
        .watch(css, ['css', 'vendorcss'])
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

/**
 * Backwards compatible call to make stage and build equivalent
 */
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
        .pipe(gulpJshint(jshintrcFile))
        .pipe(gulpJshint.reporter('jshint-stylish'));
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
        .pipe(gulpJscs('./.jscsrc'));
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

    return gulpNodemon(options)
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
