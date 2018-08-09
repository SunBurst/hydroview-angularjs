(function() {
    'use strict';
    
    angular
        .module('app.station')
        .controller('StationDashboardCtrl', StationDashboardCtrl);
        
    StationDashboardCtrl.$inject = [
        '_parameters'
    ];

    function StationDashboardCtrl(_parameters) {
        var vm = this;

        vm.parameters = _parameters;
    }
        
})();
