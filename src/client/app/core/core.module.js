(function() {
    'use strict';

    angular.module('app.core', [
        /*
         * Angular modules
         */
        'ngResource', 'ngRoute', 'ngSanitize', 
        /*
         * Our reusable cross app code modules
         */
        'app.envconfig', 
        /*
         * 3rd Party modules
         */
        'md.data.table', 'ngCsv', 'ngMaterial', 'ngMdIcons', 'ngYoutubeEmbed', 'uiGmapgoogle-maps', 'ui.router',
    ]);
    
})();
