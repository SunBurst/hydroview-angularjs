(function() {
  'use strict';

  angular
      .module('app.station')
      .directive('stationDashboard', stationDashboard);
  
  function stationDashboard() {
    var directive = {
      restrict: 'E',
      scope: {
        parameters: '='
      },
      templateUrl: 'app/station/station-dashboard.directive.html',
      controller: StationDashboardDirectiveCtrl,
      controllerAs: 'stationDashboardDirectiveVm',
      bindToController: true
    };

    return directive;
  }
    
  function StationDashboardDirectiveCtrl($scope, $mdDialog) {
      var vm = this;

      vm.noneSelected = noneSelected;
      vm.numOfSelected = 0;
      vm.changeSelected = changeSelected;
      vm.status = '';

      function noneSelected() {
        if (vm.numOfSelected == 0) {
          return true;
        }
        return false;
      }

      function changeSelected(index) {
        if (vm.parameters[index].selected) {
          vm.numOfSelected++;
        }
        else {
          vm.numOfSelected--;
        }
      }

      function getSelectedParameters() {
        var parameters = [];
        for (i = 0; i < vm.parameters.length; i++) {
          var parameter = vm.parameters[i];
          if (parameter.selected) {
            parameters.push(parameter);
          }
        }
        return parameters;
      }

      function showDataDialog(ev) {
        $mdDialog.show({
          controller: 'StationDashboardDataDialogController',
          controllerAs: 'stationDashboardDataDialogControllerVm',
          templateUrl: 'station-dashboard.datadialog.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true,
          locals: {
            parameters: getSelectedParameters()
          }
        })
          .then(function(answer) {
            vm.status = 'You said the information was "' + answer + '".';
          }, function() {
            vm.status = 'You cancelled the dialog.';
          });
      }
  }
  
})();