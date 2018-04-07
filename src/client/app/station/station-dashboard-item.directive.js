(function() {
  'use strict';

  angular
      .module('app.station')
      .directive('stationDashboardItem', stationDashboardItem);

  function stationDashboardItem() {
      var directive = {
          restrict: 'EA',
          templateUrl: 'app/station/station-dashboard-item.directive.html',
          scope: {
              parameter: '='
          },
          controller: StationDashboardItemCtrl,
          controllerAs: 'stationDashboardItemVm',
          bindToController: true
      };

      return directive;
  }

  StationDashboardItemCtrl.$inject = [
  ];

  function StationDashboardItemCtrl() {
    var vm = this;
    //vm.changeSelected = changeSelected;

    //function changeSelected() {
    //  vm.parameter.selected = !vm.parameter.selected;
    // }
    
  }
    
})();
