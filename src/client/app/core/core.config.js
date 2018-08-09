(function() {
    'use strict';
    
    var core = angular.module('app.core');
    
    core.config(toastrConfig);
    
    /* @ngInject */
    function toastrConfig(toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
    }
    
    var config = {
        appErrorPrefix: '[NG-HydroView Error] ', //Configure the exceptionHandler decorator
        appTitle: 'HydroView-angularjs',
        version: '1.0.0'
    };
    
    core.value('config', config);
    
    core.config(configure);
    
    /* @ngInject */
    function configure($qProvider, $interpolateProvider, $urlRouterProvider, $locationProvider, $mdThemingProvider) {

        $qProvider.errorOnUnhandledRejections(false);
        
        $locationProvider.html5Mode(false);
        $locationProvider.hashPrefix('!');
        
        $urlRouterProvider.otherwise('/start');
        
        var customBlueMap = $mdThemingProvider.extendPalette('light-blue', {
            'contrastDefaultColor': 'light',
            'contrastDarkColors': ['50'],
            '50': 'ffffff'
        });
        
        $mdThemingProvider.definePalette('customBlue', customBlueMap);
        
        $mdThemingProvider.theme('default')
            .primaryPalette('customBlue', {
                'default': '500',
                'hue-1': '50'
            })
            .accentPalette('pink');
        
        $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
        
        $mdThemingProvider.theme('input', 'default')
            .primaryPalette('grey');
        
    }
    
})();
