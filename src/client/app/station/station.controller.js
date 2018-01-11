(function() {
    'use strict';
    
    angular
        .module('app.station')
        .controller('StationCtrl', StationCtrl);
    
    StationCtrl.$inject = ['$state', 'stationStorage'];
    
    function StationCtrl($state, stationStorage) {
        var vm = this;
        vm.station = stationStorage.getStation();
    }
    
})();
