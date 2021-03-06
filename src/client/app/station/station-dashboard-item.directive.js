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
    vm.applyOptions = applyOptions;
    vm.clearSearchTerm = clearSearchTerm;
    vm.heatmapIsSelected = heatmapIsSelected;
    vm.changeChartType = changeChartType;
    vm.isSingleParameter = isSingleParameter;
    vm.isProfile = isProfile;
    vm.switchShowOptions = switchShowOptions;
    vm.updateSelected = updateSelected;
    vm.$onInit = onInit;

    function getDailyChartDataByQCLevel(sensorId, qcLevel, fromTimestmap, toTimestamp, selectedDataSets, orderBy) {
      return stationSingleParameterMeasurements.getDailySingleParameterMeasurements(sensorId, vm.parameter.parameter_id, qcLevel, fromTimestmap, toTimestamp, selectedDataSets, orderBy)
        .then(function(response) {
          return response.data;
        });
    }
    
    function getDailyProfileChartDataByQCLevel(sensorId, qcLevel, fromTimestmap, toTimestamp, selectedDataSets, orderBy) {
      return stationProfileParameterMeasurements.getDailyProfileParameterMeasurements(sensorId, vm.parameter.parameter_id, qcLevel, fromTimestmap, toTimestamp, selectedDataSets, orderBy)
        .then(function(response) {
          return response.data;
        });
    }
    
    function getHourlyChartDataByQCLevel(sensorId, qcLevel, fromTimestmap, toTimestamp, selectedDataSets, orderBy) {
      return stationSingleParameterMeasurements.getHourlySingleParameterMeasurements(sensorId, vm.parameter.parameter_id, qcLevel, fromTimestmap, toTimestamp, selectedDataSets, orderBy)
        .then(function(response) {
          return response.data;
        });
    }
    
    function getHourlyProfileChartDataByQCLevel(sensorId, qcLevel, fromTimestmap, toTimestamp, selectedDataSets, orderBy) {
      return stationProfileParameterMeasurements.getHourlyProfileParameterMeasurements(sensorId, vm.parameter.parameter_id, qcLevel, fromTimestmap, toTimestamp, selectedDataSets, orderBy)
        .then(function(response) {
          return response.data;
        });
    }
    
    function getThirtyMinChartDataByQCLevel(sensorId, qcLevel, fromTimestmap, toTimestamp, selectedDataSets, orderBy) {
      return stationSingleParameterMeasurements.getThirtyMinSingleParameterMeasurements(sensorId, vm.parameter.parameter_id, qcLevel, fromTimestmap, toTimestamp, selectedDataSets, orderBy)
        .then(function(response) {
          return response.data;
        });
    }
    
    function getThirtyMinProfileChartDataByQCLevel(sensorId, qcLevel, fromTimestmap, toTimestamp, selectedDataSets, orderBy) {
      return stationProfileParameterMeasurements.getThirtyMinProfileParameterMeasurements(sensorId, vm.parameter.parameter_id, qcLevel, fromTimestmap, toTimestamp, selectedDataSets, orderBy)
        .then(function(response) {
          return response.data;
        });
    }
    
    function getTwentyMinChartDataByQCLevel(sensorId, qcLevel, fromTimestmap, toTimestamp, selectedDataSets, orderBy) {
      return stationSingleParameterMeasurements.getTwentyMinSingleParameterMeasurements(sensorId, vm.parameter.parameter_id, qcLevel, fromTimestmap, toTimestamp, selectedDataSets, orderBy)
        .then(function(response) {
          return response.data;
        });
    }
    
    function getTwentyMinPorfileChartDataByQCLevel(sensorId, qcLevel, fromTimestmap, toTimestamp, selectedDataSets, orderBy) {
      return stationProfileParameterMeasurements.getTwentyMinProfileParameterMeasurements(sensorId, vm.parameter.parameter_id, qcLevel, fromTimestmap, toTimestamp, selectedDataSets, orderBy)
        .then(function(response) {
          return response.data;
        });
    }
    
    function getFifteenMinChartDataByQCLevel(sensorId, qcLevel, fromTimestmap, toTimestamp, selectedDataSets, orderBy) {
      return stationSingleParameterMeasurements.getFifteenMinSingleParameterMeasurements(sensorId, vm.parameter.parameter_id, qcLevel, fromTimestmap, toTimestamp, selectedDataSets, orderBy)
        .then(function(response) {
          return response.data;
        });
    }
    
    function getFifteenMinProfileChartDataByQCLevel(sensorId, qcLevel, fromTimestmap, toTimestamp, selectedDataSets, orderBy) {
      return stationProfileParameterMeasurements.getFifteenMinProfileParameterMeasurements(sensorId, vm.parameter.parameter_id, qcLevel, fromTimestmap, toTimestamp, selectedDataSets, orderBy)
        .then(function(response) {
          return response.data;
        });
    }
    
    function getTenMinChartDataByQCLevel(sensorId, qcLevel, fromTimestmap, toTimestamp, selectedDataSets, orderBy) {
      return stationSingleParameterMeasurements.getTenMinSingleParameterMeasurements(sensorId, vm.parameter.parameter_id, qcLevel, fromTimestmap, toTimestamp, selectedDataSets, orderBy)
        .then(function(response) {
          return response.data;
        });
    }
    
    function getTenMinProfileChartDataByQCLevel(sensorId, qcLevel, fromTimestmap, toTimestamp, selectedDataSets, orderBy) {
      return stationProfileParameterMeasurements.getTenMinProfileParameterMeasurements(sensorId, vm.parameter.parameter_id, qcLevel, fromTimestmap, toTimestamp, selectedDataSets, orderBy)
        .then(function(response) {
          return response.data;
        });
    }
    
    function getFiveMinChartDataByQCLevel(sensorId, qcLevel, fromTimestmap, toTimestamp, selectedDataSets, orderBy) {
      return stationSingleParameterMeasurements.getFiveMinSingleParameterMeasurements(sensorId, vm.parameter.parameter_id, qcLevel, fromTimestmap, toTimestamp, selectedDataSets, orderBy)
        .then(function(response) {
          return response.data;
        });
    }
    
    function getFiveMinProfileChartDataByQCLevel(sensorId, qcLevel, fromTimestmap, toTimestamp, selectedDataSets, orderBy) {
      return stationProfileParameterMeasurements.getFiveMinProfileParameterMeasurements(sensorId, vm.parameter.parameter_id, qcLevel, fromTimestmap, toTimestamp, selectedDataSets, orderBy)
        .then(function(response) {
          return response.data;
        });
    }
    
    function getOneMinChartDataByQCLevel(sensorId, qcLevel, fromTimestmap, toTimestamp, selectedDataSets, orderBy) {
      return stationSingleParameterMeasurements.getOneMinSingleParameterMeasurements(sensorId, vm.parameter.parameter_id, qcLevel, fromTimestmap, toTimestamp, selectedDataSets, orderBy)
        .then(function(response) {
          return response.data;
        });
    }
    
    function getOneMinProfileChartDataByQCLevel(sensorId, qcLevel, fromTimestmap, toTimestamp, selectedDataSets, orderBy) {
      return stationProfileParameterMeasurements.getOneMinProfileParameterMeasurements(sensorId, vm.parameter.parameter_id, qcLevel, fromTimestmap, toTimestamp, selectedDataSets, orderBy)
        .then(function(response) {
          return response.data;
        });
    }
    
    function getOneSecChartDataByQCLevel(sensorId, qcLevel, fromTimestmap, toTimestamp, selectedDataSets, orderBy) {
      return stationSingleParameterMeasurements.getOneSecSingleParameterMeasurements(sensorId, vm.parameter.parameter_id, qcLevel, fromTimestmap, toTimestamp, selectedDataSets, orderBy)
        .then(function(response) {
          return response.data;
        });
    }
    
    function getOneSecProfileChartDataByQCLevel(sensorId, qcLevel, fromTimestmap, toTimestamp, selectedDataSets, orderBy) {
      return stationProfileParameterMeasurements.getOneSecProfileParameterMeasurements(sensorId, vm.parameter.parameter_id, qcLevel, fromTimestmap, toTimestamp, selectedDataSets, orderBy)
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
                var orderBy = 'ASC';
                var _selectedDataSets = [];
                for (var i = 0; i < vm.parameter.selectedDataSets.length; i++) {
                  var dataSet = vm.parameter.selectedDataSets[i];
                  if (dataSet.toggled) {
                    _selectedDataSets.push(dataSet.id);
                  }
                }
                if (CoreFactory.arrayContains('15 Min', sensor.measurement_frequencies)) {
                  if (vm.isSingleParameter()) {
                    resource = getFifteenMinChartDataByQCLevel(sensor.sensor_id, qcLevel.qc_level, fromTimestmap, toTimestamp, _selectedDataSets, orderBy);
                  }
                  else if (vm.isProfile()) {
                    resource = getFifteenMinProfileChartDataByQCLevel(sensor.sensor_id, qcLevel.qc_level, fromTimestmap, toTimestamp, _selectedDataSets, orderBy);
                  }
                }
                else if (CoreFactory.arrayContains('10 Min', sensor.measurement_frequencies)) {
                  if (vm.isSingleParameter()) {
                    resource = getTenMinChartDataByQCLevel(sensor.sensor_id, qcLevel.qc_level, fromTimestmap, toTimestamp, _selectedDataSets, orderBy);
                  }
                  else if (vm.isProfile()) {
                    resource = getTenMinProfileChartDataByQCLevel(sensor.sensor_id, qcLevel.qc_level, fromTimestmap, toTimestamp, _selectedDataSets, orderBy);
                  }
                }

                else if (CoreFactory.arrayContains('5 Min', sensor.measurement_frequencies)) {
                  if (vm.isSingleParameter()) {
                    resource = getFiveMinChartDataByQCLevel(sensor.sensor_id, qcLevel.qc_level, fromTimestmap, toTimestamp, _selectedDataSets, orderBy);
                  }
                  else if (vm.isProfile()) {
                    resource = getFiveMinProfileChartDataByQCLevel(sensor.sensor_id, qcLevel.qc_level, fromTimestmap, toTimestamp, _selectedDataSets, orderBy);
                  }
                }

                else if (CoreFactory.arrayContains('1 Min', sensor.measurement_frequencies)) {
                  if (vm.isSingleParameter()) {
                    resource = getOneMinChartDataByQCLevel(sensor.sensor_id, qcLevel.qc_level, fromTimestmap, toTimestamp, _selectedDataSets, orderBy);
                  }
                  else if (vm.isProfile()) {
                    resource = getOneMinProfileChartDataByQCLevel(sensor.sensor_id, qcLevel.qc_level, fromTimestmap, toTimestamp, _selectedDataSets, orderBy);
                  }
                }

                else if (CoreFactory.arrayContains('1 Sec', sensor.measurement_frequencies)) {
                  if (vm.isSingleParameter()) {
                    resource = getOneSecChartDataByQCLevel(sensor.sensor_id, qcLevel.qc_level, fromTimestmap, toTimestamp, _selectedDataSets, orderBy);
                  }
                  else if (vm.isProfile()) {
                    resource = getOneSecProfileChartDataByQCLevel(sensor.sensor_id, qcLevel.qc_level, fromTimestmap, toTimestamp, _selectedDataSets, orderBy);
                  }
                }

                else if (CoreFactory.arrayContains('20 Min', sensor.measurement_frequencies)) {
                  if (vm.isSingleParameter()) {
                    resource = getTwentyMinChartDataByQCLevel(sensor.sensor_id, qcLevel.qc_level, fromTimestmap, toTimestamp, _selectedDataSets, orderBy);
                  }
                  else if (vm.isProfile()) {
                    resource = getTwentyMinProfileChartDataByQCLevel(sensor.sensor_id, qcLevel.qc_level, fromTimestmap, toTimestamp, _selectedDataSets, orderBy);
                  }
                }

                else if (CoreFactory.arrayContains('30 Min', sensor.measurement_frequencies)) {
                  if (vm.isSingleParameter()) {
                    resource = getThirtyMinChartDataByQCLevel(sensor.sensor_id, qcLevel.qc_level, fromTimestmap, toTimestamp, _selectedDataSets, orderBy);
                  }
                  else if (vm.isProfile()) {
                    resource = getThirtyMinProfileChartDataByQCLevel(sensor.sensor_id, qcLevel.qc_level, fromTimestmap, toTimestamp, _selectedDataSets, orderBy);
                  }
                }

                else if (CoreFactory.arrayContains('Hourly', sensor.measurement_frequencies)) {
                  if (vm.isSingleParameter()) {
                    resource = getHourlyChartDataByQCLevel(sensor.sensor_id, qcLevel.qc_level, fromTimestmap, toTimestamp, _selectedDataSets, orderBy);
                  }
                  else if (vm.isProfile()) {
                    resource = getHourlyProfileChartDataByQCLevel(sensor.sensor_id, qcLevel.qc_level, fromTimestmap, toTimestamp, _selectedDataSets, orderBy);
                  }
                }

                else if (CoreFactory.arrayContains('Daily', sensor.measurement_frequencies)) {
                  if (vm.isSingleParameter()) {
                    resource = getDailyChartDataByQCLevel(sensor.sensor_id, qcLevel.qc_level, fromTimestmap, toTimestamp, _selectedDataSets, orderBy);
                  }
                  else if (vm.isProfile()) {
                    resource = getDailyMinProfileChartDataByQCLevel(sensor.sensor_id, qcLevel.qc_level, fromTimestmap, toTimestamp, _selectedDataSets, orderBy);
                  }
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
      initChart();
    }
    
    function initChart() {
      if (vm.parameter.selectedFrequency === 'Dynamic') {
        if (vm.isSingleParameter()) {
          getDynamicChartData((moment().subtract(7, 'day')).valueOf(), moment().valueOf())
            .then(function(data) {
              vm.parameter.chartConfig.series = [];  
              for (var sensorId in data) {
                if (data.hasOwnProperty(sensorId)) {
                  for (var qcLevel in data[sensorId]) {
                    if (data[sensorId].hasOwnProperty(qcLevel)) {
                      data[sensorId][qcLevel].then(function(qcData) {
                        if (vm.parameter.selectedChartType === 'line' || vm.parameter.selectedChartType === 'column') {
                          for (var i = 0; i < vm.parameter.selectedDataSets.length; i++) {
                            var dataSet = vm.parameter.selectedDataSets[i];
                            if (dataSet.toggled) {
                              var dataSetColumnName = dataSet.id + "_value";
                              var seriesId = vm.parameter.parameter_id + "-" + sensorId + "-" + qcLevel + "-" + dataSet.id;
                              var sensor = getSensor(sensorId);
                              var seriesName = sensor.sensor_name + " (" + dataSet.label + " , QC Level: " + qcLevel + ")";
                              var series = {
                                id: seriesId,
                                name: seriesName,
                                data: []
                              };
                              for (var j = 0; j < qcData.length; j++) {
                                series.data.push([qcData[j].timestamp, qcData[j][dataSetColumnName]]);
                              }
                              vm.parameter.chartConfig.series.push(series);
                            }
                          }
                        }
                        vm.parameter.chartConfig = angular.copy(vm.parameter.chartConfig);
                      });
                    }
                  }
                }
              }
            vm.parameter.chartConfig = angular.copy(vm.parameter.chartConfig);
          });
        }
        else if (vm.isProfile()) {
           getDynamicChartData((moment().subtract(1, 'day')).valueOf(), moment().valueOf())
            .then(function(data) {
               for (var sensorId in data) {
                  if (data.hasOwnProperty(sensorId)) {
                    for (var qcLevel in data[sensorId]) {
                      if (data[sensorId].hasOwnProperty(qcLevel)) {
                        data[sensorId][qcLevel].then(function(qcData) {
                          if (vm.parameter.selectedChartType === 'heatmap') {
                            var dataSet = vm.parameter.selectedDataSet;
                            var dataSetColumnName = dataSet + "_value";
                            var seriesId = vm.parameter.parameter_id + "-" + sensorId + "-" + qcLevel + "-" + dataSet;
                            var sensor = getSensor(sensorId);
                            var seriesName = sensor.sensor_name + ' (QC Level: ' + qcLevel +')';
                            var dataLength = qcData.length;
                            var numberOfProfiles = 0;
                            var colSize = 24 * 36e5; 
                            
                            if (sensor.vertical_positions.length !== 0) {
                              numberOfProfiles = dataLength / sensor.vertical_positions.length;
                            }
                            
                            if (numberOfProfiles !== 0) {
                              colSize = (24 * 36e5) / numberOfProfiles;
                            }
                            
                            if (sensor.vertical_positions.length >= 2) {
                              var yAxisMin = sensor.vertical_positions[0];
                              var yAxisMax = sensor.vertical_positions[sensor.vertical_positions.length - 1];
                              vm.parameter.chartConfig.yAxis['min'] = yAxisMin;
                              vm.parameter.chartConfig.yAxis['max'] = yAxisMax;
                            }

                            var series = {
                              id: seriesId,
                              name: seriesName,
                              borderWidth: 0,
                              turboThreshold: Number.MAX_VALUE,
                              nullColor: '#EFEFEF',
                              colsize: colSize,
                              data: [],
                              tooltip: {
                                headerFormat: '<b>' + seriesName + '</b><br/>',
                                pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y} ' + sensor.vertical_position_unit + '<br/>{point.value} ' + vm.parameter.parameter_unit
                              }
                            };

                            for (var i = 0; i < qcData.length; i++) {
                              series.data.push([qcData[i].timestamp, qcData[i].vertical_position, qcData[i][dataSetColumnName]]);
                            }

                            vm.parameter.chartConfig.yAxis.title.text = 'Vertical Position ' + '(' + sensor.vertical_position_unit + ')';
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

    function clearSearchTerm(sensorIndex) {
      vm.parameter.sensors[sensorIndex].searchTerm = "";
    }

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
