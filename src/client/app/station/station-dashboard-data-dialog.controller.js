(function() {
  'use strict';
    
  angular
    .module('app.station')
    .controller('StationDashboardDataDialogController', StationDashboardDataDialogController);
    
    StationDashboardDataDialogController.$inject = [$mdDialog, parameters];
    
    function StationDashboardDataDialogController($mdDialog, parameters) {
      var vm = this;
        
      vm.parameters = parameters;
      vm.hide = function() {
        $mdDialog.hide();
      };

      vm.cancel = function() {
        $mdDialog.cancel();
      };

      vm.answer = function(answer) {
        $mdDialog.hide(answer);
      };
    
    }

});