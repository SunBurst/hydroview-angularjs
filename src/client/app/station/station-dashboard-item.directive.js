(function() {
  'use strict';

  angular
      .module('app.station')
      .directive('stationDashboardItem', stationDashboardItem);
  
  function stationDashboardItem() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/station/station-dashboard-item.directive.html',
      scope: {
        id: '@',
        parameter: '=',
        changeSelected: '&'
      },
      controller: StationDashboardItemCtrl,
      controllerAs: 'stationDashboardItemVm',
      bindToController: true
    };

    return directive;
  }
  
  StationDashboardItemCtrl.$inject = ['$element', '$q', 'CoreFactory', 'stationStorage', 'stationProfileParameterMeasurements', 'stationSingleParameterMeasurements'];
  
  function StationDashboardItemCtrl($element, $q, CoreFactory, stationStorage, stationProfileParameterMeasurements, stationSingleParameterMeasurements) {
    var vm = this;

    vm.station = stationStorage.getStation();
    vm.searchTerm;
    vm.applyOptions = applyOptions;
    vm.clearSearchTerm = clearSearchTerm;
    vm.heatmapIsSelected = heatmapIsSelected;
    vm.changeChartType = changeChartType;
    vm.isSingleParameter = isSingleParameter;
    vm.isProfile = isProfile;
    vm.switchShowOptions = switchShowOptions;
    vm.updateSelected = updateSelected;
    vm.$onInit = onInit;

    function getDailyChartDataByQCLevel(sensorId, qcLevel, fromTimestmap, toTimestamp) {
      var orderBy = 'ASC';
      return stationSingleParameterMeasurements.getDailySingleParameterMeasurements(sensorId, vm.parameter.parameter_id, qcLevel, fromTimestmap, toTimestamp, orderBy)
        .then(function(response) {
          return response.data;
        });
    }
    
    function getHourlyChartDataByQCLevel(sensorId, qcLevel, fromTimestmap, toTimestamp) {
      var orderBy = 'ASC';
      return stationSingleParameterMeasurements.getHourlySingleParameterMeasurements(sensorId, vm.parameter.parameter_id, qcLevel, fromTimestmap, toTimestamp, orderBy)
        .then(function(response) {
          return response.data;
        });
    }
    
    function getThirtyMinChartDataByQCLevel(sensorId, qcLevel, fromTimestmap, toTimestamp) {
      var orderBy = 'ASC';
      return stationSingleParameterMeasurements.getThirtyMinSingleParameterMeasurements(sensorId, vm.parameter.parameter_id, qcLevel, fromTimestmap, toTimestamp, orderBy)
        .then(function(response) {
          return response.data;
        });
    }
    
    function getTwentyMinChartDataByQCLevel(sensorId, qcLevel, fromTimestmap, toTimestamp) {
      var orderBy = 'ASC';
      return stationSingleParameterMeasurements.getTwentyMinSingleParameterMeasurements(sensorId, vm.parameter.parameter_id, qcLevel, fromTimestmap, toTimestamp, orderBy)
        .then(function(response) {
          return response.data;
        });
    }
    
    function getFifteenMinChartDataByQCLevel(sensorId, qcLevel, fromTimestmap, toTimestamp) {
      var orderBy = 'ASC';
      return stationSingleParameterMeasurements.getFifteenMinSingleParameterMeasurements(sensorId, vm.parameter.parameter_id, qcLevel, fromTimestmap, toTimestamp, orderBy)
        .then(function(response) {
          return response.data;
        });
    }
    
    function getFifteenMinProfileChartDataByQCLevel(sensorId, qcLevel, fromTimestmap, toTimestamp) {
      var orderBy = 'ASC';
      var _selectedDataSets = [];
      for (var i = 0; i < vm.parameter.selectedDataSets.length; i++) {
        var dataSet = vm.parameter.selectedDataSets[i];
        if (dataSet.toggled) {
          _selectedDataSets.push(dataSet.id);
        }
      }
      return stationProfileParameterMeasurements.getFifteenMinProfileParameterMeasurements(sensorId, vm.parameter.parameter_id, qcLevel, fromTimestmap, toTimestamp, _selectedDataSets, orderBy)
        .then(function(response) {
          return response.data;
        });
    }
    
    function getTenMinChartDataByQCLevel(sensorId, qcLevel, fromTimestmap, toTimestamp) {
      var orderBy = 'ASC';
      return stationSingleParameterMeasurements.getTenMinSingleParameterMeasurements(sensorId, vm.parameter.parameter_id, qcLevel, fromTimestmap, toTimestamp)
        .then(function(response) {
          return response.data;
        });
    }
    
    function getFiveMinChartDataByQCLevel(sensorId, qcLevel, fromTimestmap, toTimestamp) {
      var orderBy = 'ASC';
      var _selectedDataSets = [];
      for (var i = 0; i < vm.parameter.selectedDataSets.length; i++) {
        var dataSet = vm.parameter.selectedDataSets[i];
        if (dataSet.toggled) {
          _selectedDataSets.push(dataSet.id);
        }
      }
      return stationSingleParameterMeasurements.getFiveMinSingleParameterMeasurements(sensorId, vm.parameter.parameter_id, qcLevel, fromTimestmap, toTimestamp, _selectedDataSets, orderBy)
        .then(function(response) {
          return response.data;
        });
    }
    
    function getOneMinChartDataByQCLevel(sensorId, qcLevel, fromTimestmap, toTimestamp) {
      var orderBy = 'ASC';
      return stationSingleParameterMeasurements.getOneMinSingleParameterMeasurements(sensorId, vm.parameter.parameter_id, qcLevel, fromTimestmap, toTimestamp, orderBy)
        .then(function(response) {
          return response.data;
        });
    }
    
    function getOneSecChartDataByQCLevel(sensorId, qcLevel, fromTimestmap, toTimestamp) {
      var orderBy = 'ASC';
      return stationSingleParameterMeasurements.getOneSecSingleParameterMeasurements(sensorId, vm.parameter.parameter_id, qcLevel, fromTimestmap, toTimestamp, orderBy)
        .then(function(response) {
          return response.data;
        });
    }

    function getDynamicChartData(fromTimestmap, toTimestamp) {
      var promises = {};
      for (var i = 0; i < vm.parameter.sensors.length; i++) {
        var sensor = vm.parameter.sensors[i];
        if (sensor.toggled) {
          promises[sensor.sensor_id] = {}
          for (var j = 0; j < vm.parameter.qcLevels.length; j++) {
            var qcLevel = vm.parameter.qcLevels[j];
            if (qcLevel.toggled) {
              var resource;
              if (sensor.measurement_frequencies) {
                if (CoreFactory.arrayContains('15 Min', sensor.measurement_frequencies)) {
                  if (vm.isSingleParameter()) {
                    resource = getFifteenMinChartDataByQCLevel(sensor.sensor_id, qcLevel.qc_level, fromTimestmap, toTimestamp);
                  }
                  else if (vm.isProfile()) {
                    resource = getFifteenMinProfileChartDataByQCLevel(sensor.sensor_id, qcLevel.qc_level, fromTimestmap, toTimestamp);
                  }
                }
                else if (CoreFactory.arrayContains('10 Min', sensor.measurement_frequencies)) {
                  resource = getTenMinChartDataByQCLevel(sensor.sensor_id, qcLevel.qc_level, fromTimestmap, toTimestamp);
                }

                else if (CoreFactory.arrayContains('5 Min', sensor.measurement_frequencies)) {
                  resource = getFiveMinChartDataByQCLevel(sensor.sensor_id, qcLevel.qc_level, fromTimestmap, toTimestamp);
                }

                else if (CoreFactory.arrayContains('1 Min', sensor.measurement_frequencies)) {
                  resource = getOneMinChartDataByQCLevel(sensor.sensor_id, qcLevel.qc_level, fromTimestmap, toTimestamp);
                }

                else if (CoreFactory.arrayContains('1 Sec', sensor.measurement_frequencies)) {
                  resource = getOneSecChartDataByQCLevel(sensor.sensor_id, qcLevel.qc_level, fromTimestmap, toTimestamp);
                }

                else if (CoreFactory.arrayContains('20 Min', sensor.measurement_frequencies)) {
                  resource = getTwentyMinChartDataByQCLevel(sensor.sensor_id, qcLevel.qc_level, fromTimestmap, toTimestamp);
                }

                else if (CoreFactory.arrayContains('30 Min', sensor.measurement_frequencies)) {
                  resource = getThirtyMinChartDataByQCLevel(sensor.sensor_id, qcLevel.qc_level, fromTimestmap, toTimestamp);
                }

                else if (CoreFactory.arrayContains('Hourly', sensor.measurement_frequencies)) {
                  resource = getHourlyChartDataByQCLevel(sensor.sensor_id, qcLevel.qc_level, fromTimestmap, toTimestamp);
                }

                else if (CoreFactory.arrayContains('Daily', sensor.measurement_frequencies)) {
                  resource = getDailyChartDataByQCLevel(sensor.sensor_id, qcLevel.qc_level, fromTimestmap, toTimestamp);
                }
              }
              if (resource) {
                promises[sensor.sensor_id][qcLevel.qc_level] = resource;
              }
            }
          }
        }
      }
      
      return $q.all(promises).then(function(data) {
        return data;
      })
    }
    
    function getSensor(sensorId) {
      for (var i = 0; i < vm.parameter.sensors.length; i++) {
        if (vm.parameter.sensors[i].sensor_id === sensorId) {
          return vm.parameter.sensors[i];
        }
      }
    } 
    
    function applyOptions() {

    }
    
    function initChart() {
      if (vm.parameter.selectedFrequency === 'Dynamic') {
        if (vm.isSingleParameter()) {
          getDynamicChartData((moment().subtract(7, 'day')).valueOf(), moment().valueOf())
            .then(function(data) {
              for (var sensorId in data) {
                if (data.hasOwnProperty(sensorId)) {
                  for (var qcLevel in data[sensorId]) {
                    if (data[sensorId].hasOwnProperty(qcLevel)) {
                      data[sensorId][qcLevel].then(function(qcData) {
                        if (vm.parameter.selectedChartType === 'line' || vm.parameter.selectedChartType === 'column') {
                          var seriesId = vm.parameter.parameter_id + "-" + sensorId + "-" + qcLevel;
                          var sensor = getSensor(sensorId);
                          var seriesName = sensor.sensor_name + ' (QC Level: ' + qcLevel +')';
                          var series = {
                            id: seriesId,
                            name: seriesName,
                            data: []
                          };
                          for (var i = 0; i < qcData.length; i++) {
                            series.data.push([qcData[i].timestamp, qcData[i].avg_value]);
                          }
                            vm.parameter.chartConfig.series = [];
                            vm.parameter.chartConfig.series.push(series);
                            vm.parameter.chartConfig = angular.copy(vm.parameter.chartConfig);
                        }
                        
                      });
                    }
                  }
                }
              }
          });
        }
        else if (vm.isProfile()) {
           getDynamicChartData((moment().subtract(7, 'day')).valueOf(), moment().valueOf())
            .then(function(data) {
               for (var sensorId in data) {
                  if (data.hasOwnProperty(sensorId)) {
                    for (var qcLevel in data[sensorId]) {
                      if (data[sensorId].hasOwnProperty(qcLevel)) {
                        data[sensorId][qcLevel].then(function(qcData) {
                          if (vm.parameter.selectedChartType === 'heatmap') {
                            var seriesId = vm.parameter.parameter_id + "-" + sensorId + "-" + qcLevel;
                            var sensor = getSensor(sensorId);
                            var seriesName = sensor.sensor_name + ' (QC Level: ' + qcLevel +')';
                            console.log(vm.parameter);
                            var series = {
                              id: seriesId,
                              name: seriesName,
                              borderWidth: 0,
                              turboThreshold: 100,
                              nullColor: '#EFEFEF',
                              colsize: 24 * 36e5, // one day
                              data: [],
                              tooltip: {
                                headerFormat: seriesName + '<br/>',
                                pointFormat: '{point.x:%Y-%m-%d %H:%M:%S} {point.y} <b>{point.value} ' + vm.parameter.parameter_unit + '</b>'
                              }
                            };
                            for (var i = 0; i < qcData.length; i++) {
                              series.data.push([qcData[i].timestamp, qcData[i].vertical_position, qcData[i].avg_value]);
                            }
                            vm.parameter.chartConfig.series = [];
                            vm.parameter.chartConfig.series.push(series);
                            vm.parameter.chartConfig = angular.copy(vm.parameter.chartConfig);
                          }

                        });
                      }
                    }
                  }
                }
           });
        }
      }
    }

    function onInit() {
      initChart();
    }



    function changeChartType() {
      if (vm.heatmapIsSelected()) {
        var firstToggledSensorFound = false;
        for (var i = 0; i < vm.parameter.sensors.length; i++) {
          var sensor = vm.parameter.sensors[i];
          if (sensor.toggled) {
            if (!(firstToggledSensorFound)) {
              firstToggledSensorFound = true;                             
              vm.parameter.selectedSensor = sensor.id;
            }
            else {
              sensor.toggled = false;
            }
          }
        }

        var firstToggledDataSetFound = false;
        for (var i = 0; i < vm.parameter.selectedDataSets.length; i++) {
          var dataSet = vm.parameter.selectedDataSets[i];
          if (dataSet.toggled) {
            if (!(firstToggledDataSetFound)) {
              firstToggledDataSetFound = true;                           
              vm.parameter.selectedDataSet = dataSet.id;
            }
            else {
              dataSet.toggled = false;
            }
          }
        }
        vm.parameter.selectedVerticalPositions = angular.copy(vm.parameter.verticalPositions);
      }

      else {
        vm.parameter.selectedSensor = "";
        vm.parameter.selectedDataSet = "avg";
      }

      vm.parameter.chartConfig.chart.type = vm.parameter.selectedChartType;
      vm.parameter.chartConfig = angular.copy(vm.parameter.chartConfig);

    }

    function heatmapIsSelected() {
      return vm.parameter.selectedChartType === "heatmap";
    }

    $element.find('input').on('keydown', function(ev) {
      ev.stopPropagation();
    });

    function clearSearchTerm() {
      vm.searchTerm = '';
    };

    function isSingleParameter() {
      return vm.parameter.parameter_type === "single";
    }

    function isProfile() {
      return vm.parameter.parameter_type === "profile";
    }

    function updateSelected() {
      vm.parameter.selected = !vm.parameter.selected;
      vm.changeSelected()(vm.id);
    }

    function switchShowOptions() {
      vm.parameter.showOptions = !vm.parameter.showOptions;
    } 
  
  }
    
})();
