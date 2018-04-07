(function() {
    'use strict';
    
    angular
        .module('app.station')
        .controller('StationDashboardCtrl', StationDashboardCtrl);
        
    StationDashboardCtrl.$inject = [
        '_station', '_parameterList', '_parameters', '$mdDialog'
    ];

    function StationDashboardCtrl(_station, _parameterList, _parameters, $mdDialog) {
        var vm = this;
        
        vm.station = _station;
        vm.parameterList = _parameterList;
        vm.parameters = _parameters;
        vm.changeSelected = changeSelected;
        vm.getSelectedParameters = getSelectedParameters;
        vm.numOfSelected = 0;
        vm.noneSelected = noneSelected;
        vm.showDataDialog = showDataDialog;
        vm.status = "";
        
        function changeSelected(index) {
            vm.parameterList[index].selected = !vm.parameterList[index].selected;
            if (vm.parameterList[index].selected) {
              vm.numOfSelected++;
            }
            else {
              vm.numOfSelected--;
            }
        }
        
        function noneSelected() {
          if (vm.numOfSelected == 0) {
            return true;
          }
          return false;
        }
        
        function getSelectedParameters() {
            var parameters = [];
            for (i = 0; i < vm.parameterList.length; i++) {
              var parameter = vm.parameterList[i];
              if (parameter.selected) {
                parameters.push(parameter);
              }
            }
            return parameters;
        }
      
        function showDataDialog(ev) {
            $mdDialog.show({
              controller: 'StationDataDialogController',
              controllerAs: 'stationDataDialogControllerVm',
              templateUrl: 'app/station/station-data-dialog.html',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true,
              locals: {
                parameters: vm.getSelectedParameters()
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
