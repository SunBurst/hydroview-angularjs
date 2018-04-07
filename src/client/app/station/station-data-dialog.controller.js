(function() {
  'use strict';
    
  angular
    .module('app.station')
    .controller('StationDataDialogController', StationDataDialogController);
    
    StationDataDialogController.$inject = [$mdDialog, parameters];
    
    function StationDataDialogController($mdDialog, parameters) {
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