(function() {
    'use strict';
    
    angular
        .module('app.station')
        .config(config);
        
    function config($stateProvider) {
        
        $stateProvider
            .state('station', {
                url: '/station/:station_id',
                templateUrl: 'app/station/station.html',
                abstract: true,
                controller: 'StationCtrl',
                controllerAs: 'stationVm',
                redirectTo: 'station.overview',
                resolve: {
                    _station: function($stateParams, StationFactory, stationStorage) {
                        var stationId = $stateParams.station_id;
                        return StationFactory.getStation(stationId)
                            .then(function(response) {
                                var data = response.data;
                                stationStorage.setStation(data);
                                return data;
                            });
                    }
                }
            })
            .state('station.overview', {
                url: '/overview',
                templateUrl: 'app/station/station-overview.html',
                controller: 'StationOverviewCtrl',
                controllerAs: 'stationOverviewVm',
                resolve: {
                    _sensors: function($stateParams, StationSensorsFactory) {
                        var stationId = $stateParams.station_id;
                        return StationSensorsFactory.getSensors(stationId)
                            .then(function(response) {
                                return response.data;
                            });
                    },
                    /*
                    _groups: ['$stateParams', 'StationGroupsFactory', 
                        function($stateParams, StationGroupsFactory) {
                            var stationId = $stateParams.station_id;
                            return StationGroupsFactory.getGroups(stationId)
                                .then(function(response) {
                                    return response.data;
                                });
                    }],
                    */
                    _parameters: ['$stateParams', 'StationParametersFactory', 
                        function($stateParams, StationParametersFactory) {
                            var stationId = $stateParams.station_id;
                            return StationParametersFactory.getParameters(stationId)
                                .then(function(response) {
                                    return response.data;
                                });
                    }],
                }
                
            })
            /*
            .state('station.data', {
                url: '/data',
                templateUrl: 'app/station/station-data.html',
                abstract: true,
                controller: 'StationDataCtrl',
                controllerAs: 'stationDataVm'
            })
            */
            .state('station.dashboard', {
                url: '/dashboard',
                template: '<station-dashboard station="stationDashboardVm.station" parameters="stationDashboardVm.parameters"/>',
                controller: 'StationDashboardCtrl',
                controllerAs: 'stationDashboardVm',
                resolve: {
                        
                  _station: function(stationStorage) {
                    var station = stationStorage.getStation();
                    return station;
                  }, 
                       
                  _parameterList: ['$stateParams', 'StationParametersFactory', 
                    function($stateParams, StationParametersFactory) {
                      var stationId = $stateParams.station_id;
                      return StationParametersFactory.getParameters(stationId)
                        .then(function(response) {
                          var data = response.data;
                          var parameters = [];
                          for (var i = 0; i < data.length; i++){
                            var parameter = data[i];
                            parameters.push(parameter);
                          }  
                          return parameters;
                        });
                  }],
                        
                  _parameterQCLevelList: ['$stateParams', 'StationParametersFactory', 
                    function($stateParams, StationParametersFactory) {
                      var stationId = $stateParams.station_id;
                      return StationParametersFactory.getParameterQCLevels(stationId)
                        .then(function(response) {
                          return response.data;
                        });
                  }],
                        
                  _parameterQCLevels: ['_parameterQCLevelList', function(_parameterQCLevelList) {
                    var parameterQCLevels = {};
                    for (var i = 0; i < _parameterQCLevelList.length; i++) {
                      var parameterId = _parameterQCLevelList[i].parameter_id;
                      var parameterType = _parameterQCLevelList[i].parameter_type;
                      var parameterNotInObject = !(parameterId in parameterQCLevels);
                      if (parameterNotInObject) {
                        parameterQCLevels[parameterId] = {};
                      }
                      var parameterTypeNotInObject = !(parameterType in parameterQCLevels[parameterId]);
                      if (parameterTypeNotInObject) {
                        parameterQCLevels[parameterId][parameterType] = [];
                      }
                      parameterQCLevels[parameterId][parameterType].push(_parameterQCLevelList[i]);
                    }
                    return parameterQCLevels;
                  }],
                        
                  _parameterSensorList: ['$stateParams', 'StationParametersFactory',
                    function($stateParams, StationParametersFactory) {
                      var stationId = $stateParams.station_id;
                      return StationParametersFactory.getParameterSensors(stationId)
                        .then(function(response) {
                          return response.data;
                        });
                  }],
                        
                  _sensorParameterMeasurementFrequencies: ['$q', '$stateParams', 'StationParametersFactory', 
                    function($q, $stateParams, StationParametersFactory) {
                      var stationId = $stateParams.station_id;
                      return StationParametersFactory.getParameterMeasurementFrequencies(stationId)
                        .then(function(response) {
                          return response.data;
                        });
                  }],
                        
                  _parameterSensors: ['$q', '_parameterSensorList', 'SensorsFactory', function($q, _parameterSensorList, SensorsFactory) {
                      var parameterSensors = {};

                      for (var i = 0; i < _parameterSensorList.length; i++) {
                        var parameterId = _parameterSensorList[i].parameter_id;
                        var parameterType = _parameterSensorList[i].parameter_type;
                        var parameterNotInObject = !(parameterId in parameterSensors);
                        if (parameterNotInObject) {
                          parameterSensors[parameterId] = {};
                        }
                        var parameterTypeNotInObject = !(parameterType in parameterSensors[parameterId]);
                        if (parameterTypeNotInObject) {
                          parameterSensors[parameterId][parameterType] = {};
                        }
                        parameterSensors[parameterId][parameterType] = angular.copy(_parameterSensorList[i]); 
                        for (var sensorId in _parameterSensorList[i].sensors) {
                          if (_parameterSensorList[i].sensors.hasOwnProperty(sensorId)) {
                            parameterSensors[parameterId][parameterType].sensors[sensorId] = {
                              'name': _parameterSensorList[i].sensors[sensorId]
                            };
                          }
                        }
                      }

                      return parameterSensors;

                  }],
                        
                  _profileParameterVerticalPositions: ['$q', '$stateParams', 'StationParametersFactory', '_parameterList', 
                    function($q, $stateParams, StationParametersFactory, _parameterList) {

                      var stationId = $stateParams.station_id;
                      var profileVerticalPositions = {};
                      var promiseArray = [];

                      for (var i = 0; i < _parameterList.length; i++) {
                        var parameterId = _parameterList[i].parameter_id;
                        var parameterType = _parameterList[i].parameter_type;
                        if (parameterType === 'profile') {
                          var resource = StationParametersFactory.getProfileParameterVerticalPositions(stationId, parameterId);
                          promiseArray.push(resource);
                        }
                      }

                      return $q.all(promiseArray).then(function(response) {
                        for (var i = 0; i < response.length; i++) {
                          for (var j = 0; j < response[i].data.length; j++) {
                            var parameterId = response[i].data[j].parameter_id;
                            var sensorId = response[i].data[j].sensor_id;
                            
                            var parameterNotInObject = !(parameterId in profileVerticalPositions);
                            if (parameterNotInObject) {
                              profileVerticalPositions[parameterId] = {};
                            }
                            
                            var sensorNotInObject = !(sensorId in profileVerticalPositions[parameterId]);
                            if (sensorNotInObject) {
                              profileVerticalPositions[parameterId][sensorId] = {
                                'vertical_positions': [],
                                'vertical_position_unit': ''
                              };
                            }

                            var verticalPositions = response[i].data[j].vertical_positions;
                            var verticalPositionUnit = response[i].data[j].vertical_position_unit;
                            profileVerticalPositions[parameterId][sensorId]['vertical_positions'] = verticalPositions;
                            profileVerticalPositions[parameterId][sensorId]['vertical_position_unit'] = verticalPositionUnit;
                          }
                        }
                        return profileVerticalPositions;       
                      });

                  }],
                       
                  _parameters: ['_parameterList', '_sensorParameterMeasurementFrequencies', '_parameterQCLevels', '_parameterSensors', '_profileParameterVerticalPositions',
                            function(_parameterList, _sensorParameterMeasurementFrequencies, _parameterQCLevels, _parameterSensors, _profileParameterVerticalPositions) {
                              var parameters = [];

                              for (var i = 0; i < _parameterList.length; i++) {
                                var parameter = _parameterList[i];
                                parameter.measurement_frequencies = [];
                                parameter.qcLevels = [];
                                parameter.selectedQCLevel = 0;
                                parameter.selectedFrequency = "Dynamic";
                                parameter.selected = false;
                                parameter.showOptions = false;
                                parameter.selectedChartType = "line";
                                parameter.selectedDataSet = "avg";
                                parameter.selectedSensor = "";
                                parameter.sensors = [];
                                parameter.chartTypes = [];
                                parameter.chartConfig = {};
                                parameter.selectedDataSets = [
                                  {
                                    id: "min",
                                    label: "Min",
                                    toggled: false
                                  }, {
                                    id: "avg",
                                    label: "Average",
                                    toggled: true
                                  }, {
                                    id: "max",
                                    label: "Max",
                                    toggled: false
                                  }
                                ];
                                
                                var parameterInSensors = (parameter.parameter_id in _parameterSensors);
                                if (parameterInSensors) {
                                  var parameterTypeInSensors = (parameter.parameter_type in _parameterSensors[parameter.parameter_id]);
                                  if (parameterTypeInSensors) {
                                    var sensorsObj = _parameterSensors[parameter.parameter_id][parameter.parameter_type].sensors;
                                    var firstSensorToggled = false;
                                    for (var sensorId in sensorsObj) {
                                      if (sensorsObj.hasOwnProperty(sensorId)) {
                                        var sensor = {
                                          sensor_id: sensorId,
                                          sensor_name: sensorsObj[sensorId].name,
                                          measurement_frequencies: [],
                                          toggled: false
                                        };
                                        for (var j = 0; j < _sensorParameterMeasurementFrequencies.length; j++) {
                                          if (parameter.parameter_id === _sensorParameterMeasurementFrequencies[j].parameter_id) {
                                            if (sensorId === _sensorParameterMeasurementFrequencies[j].sensor_id) {
                                              sensor.measurement_frequencies = _sensorParameterMeasurementFrequencies[j].measurement_frequencies;
                                            }
                                          }
                                        }
                                        if (parameter.parameter_type === 'profile') {
                                          sensor['vertical_positions'] = [];
                                          sensor['vertical_position_unit'] = '',
                                          sensor['selectedVerticalPositions'] = [];
                                          sensor['searchTerm'] = "";
                                          var parameterInVerticalPositions = (parameter.parameter_id in _profileParameterVerticalPositions);
                                          if (parameterInVerticalPositions) {
                                            var sensorInParameterVerticalPositions = (sensorId in _profileParameterVerticalPositions[parameter.parameter_id]);
                                            if (sensorInParameterVerticalPositions) {
                                              sensor['vertical_positions'] = _profileParameterVerticalPositions[parameter.parameter_id][sensorId].vertical_positions;
                                              sensor['vertical_position_unit'] = _profileParameterVerticalPositions[parameter.parameter_id][sensorId].vertical_position_unit;
                                            }
                                          }
                                        }
                                        
                                        if (firstSensorToggled) {
                                          sensor.toggled = false;  
                                        }
                                        else {
                                          sensor.toggled = true;
                                          parameter.selectedSensor = sensorId;
                                          firstSensorToggled = true;
                                        }
                                        
                                        parameter.sensors.push(sensor);
                                      }
                                    }
                                  }
                                }
                                
                                var parameterInQCLevels = (parameter.parameter_id in _parameterQCLevels);
                                if (parameterInQCLevels) {
                                  var parameterTypeInQCLevels = (parameter.parameter_type in _parameterQCLevels[parameter.parameter_id]);
                                  if (parameterTypeInQCLevels) {
                                    var qcLevels = _parameterQCLevels[parameter.parameter_id][parameter.parameter_type];
                                    var highestQCLevelToggled = false;
                                    for (var j = qcLevels.length; j-- > 0; ) {
                                      var qcLevel = {
                                        qc_level: qcLevels[j].qc_level,
                                        qc_description: qcLevels[j].qc_description
                                      };
                                      if (highestQCLevelToggled) {
                                        qcLevel['toggled'] = false;  
                                      }
                                      else {
                                        qcLevel['toggled'] = true;
                                        parameter.selectedQCLevel = qcLevel.qc_level;
                                        highestQCLevelToggled = true;
                                      }
                                      parameter.qcLevels.push(qcLevel);
                                    }
                                  }
                                }

                                if (parameter.parameter_type === "single" || parameter.parameter_type === "group") {
                                  parameter.chartTypes.push({
                                    value: "line", 
                                    label: "Line"
                                  });
                                  parameter.chartTypes.push({
                                    value: "column",
                                    label: "Column"
                                  });
                                }
                                else if (parameter.parameter_type === "profile") {
                                  parameter.chartTypes.push({
                                    value: "heatmap",
                                    label: "Heatmap"
                                  });
                                  parameter.selectedChartType = "heatmap";
                                }
                                
                                if (parameter.selectedChartType === "line") {
                                  parameter.chartConfig = {
                                    chartType: 'stock',
                                    chart: {
                                      style: {
                                        fontFamily: 'Roboto'
                                      },
                                      type: parameter.selectedChartType
                                    },

                                    credits: {
                                      enabled: false
                                    },

                                    lang: {
                                      noData: 'No data to display'
                                    },

                                    tooltip: {
                                      valueSuffix: ' ' + (parameter.parameter_unit ? parameter.parameter_unit : ''),
                                      split: true,
                                      distance: 30,
                                      padding: 5
                                    },

                                    legend: {
                                      enabled: true,
                                      margin: 30,
                                      layout: 'horizontal',
                                      verticalAlign: 'bottom',
                                      maxHeight: 100,
                                      navigation: {
                                        activeColor: '#3E576F',
                                        animation: true,
                                        arrowSize: 12,
                                        inactiveColor: '#CCC',
                                        style: {
                                          fontWeight: 'bold',
                                          color: '#333'
                                        }
                                      }
                                    },
                                    
                                    title: {
                                      text: parameter.parameter_name
                                    },

                                    noData: {
                                      style: {
                                        fontWeight: 'bold',
                                        fontSize: '15px',
                                        color: '#303030'
                                      }
                                    },
                                    
                                    rangeSelector: {
                                      enabled: false
                                    },

                                    xAxis: [{
                                      type: 'datetime',
                                      minRange: 3600 * 1000 * 24 * 3
                                    }],

                                    yAxis: [{
                                      labels: {
                                        format: '{value} ' + (parameter.parameter_unit ? parameter.parameter_unit : '')
                                      },
                                      title: {
                                        text: parameter.parameter_name + ' (' + parameter.parameter_unit + ')'
                                      },
                                    }],

                                    series: [],

                                  }
                                }
                                else if (parameter.selectedChartType === "heatmap") {
                                  parameter.chartConfig = {
                                    
                                    chart: {
                                      type: 'heatmap',
                                      style: {
                                        fontFamily: 'Roboto'
                                      },
                                    },
                                    
                                    boost: {
                                      useGPUTranslations: true
                                    },
                                    
                                    credits: {
                                      enabled: false
                                    },
                                    
                                    lang: {
                                      noData: 'No data to display'
                                    },
                                    
                                    colorAxis: {
                                      stops: [
                                        [0, '#3060cf'],
                                        [0.5, '#fffbbc'],
                                        [0.9, '#c4463a'],
                                        [1, '#c4463a']
                                      ],
                                    },

                                    title: {
                                      text: parameter.parameter_name
                                    },

                                    xAxis: {
                                      type: 'datetime'
                                    },                                                                                                                     
                                    
                                    yAxis: {
                                      title: {
                                        align: 'middle',
                                        text: 'Vertical Position '
                                      },
                                      minPadding: 0,
                                      maxPadding: 0,
                                      reversed: true,
                                      labels: {
                                        format: '{value}' 
                                      }
                                    },

                                    legend: {
                                      enabled: true,
                                      margin: 30,
                                      layout: 'horizontal',
                                      verticalAlign: 'bottom',
                                      maxHeight: 100,
                                      navigation: {
                                        activeColor: '#3E576F',
                                        animation: true,
                                        arrowSize: 12,
                                        inactiveColor: '#CCC',
                                        style: {
                                          fontWeight: 'bold',
                                          color: '#333'
                                        }
                                      }
                                    },
                                    
                                    noData: {
                                      style: {
                                        fontWeight: 'bold',
                                        fontSize: '15px',
                                        color: '#303030'
                                      }
                                    },

                                    series: []
                                  }
                                         
                                }
                                
                                parameters.push(parameter);

                              }

                          return parameters;
                        }],
                    }
            })
            /*
            .state('station.data.groups', {
                url: '/groups',
                templateUrl: 'app/station/station-data-groups.html',
                controller: 'StationDataGroupsCtrl',
                controllerAs: 'stationDataGroupsVm',
                resolve: {
                    _station: function(stationStorage) {
                        var station = stationStorage.getStation();
                        return station;
                    },
                    _groupList: function($stateParams, StationGroupsFactory) {
                        var stationId = $stateParams.station_id;
                        return StationGroupsFactory.getGroups(stationId)
                            .then(function(response) {
                                return response.data;
                            });
                    },
                    _groupsParameterList: ['$stateParams', 'StationGroupsFactory', 
                        function($stateParams, StationGroupsFactory) {
                            var stationId = $stateParams.station_id;
                            return StationGroupsFactory.getGroupsParameters(stationId)
                                .then(function(response) {
                                    return response.data;
                                });
                    }],
                    _getGroupsParameters: ['_groupsParameterList', function(_groupsParameterList) {
                        var groupsParameters = {};
                        for (var i = 0; i < _groupsParameterList.length; i++) {
                            var groupId = _groupsParameterList[i].group_id;
                            var groupNotInObject = !(groupId in groupsParameters);
                            if (groupNotInObject) {
                                groupsParameters[groupId] = [];
                            }
                            groupsParameters[groupId].push(_groupsParameterList[i]);
                        }
                        return groupsParameters;
                    }],
                    _groupUnits: ['_groupsParameterList', function(_groupsParameterList) {
                        var groupUnits = {};
                        
                        for (var i = 0; i < _groupsParameterList.length; i++) {
                            var groupId = _groupsParameterList[i].group_id;
                            var groupNotInObject = !(groupId in groupUnits);
                            
                            if (groupNotInObject) {
                                groupUnits[groupId] = [];
                            }
                            
                            var parameterUnit = _groupsParameterList[i].parameter_unit;
                            var unitNotInObject = !(parameterUnit in groupUnits[groupId]);
                            
                            if (unitNotInObject) {
                                groupUnits[groupId].push(parameterUnit);
                            }
                        }
                        
                        return groupUnits;

                    }],
                    _groupMeasurementFrequenciesList: ['$stateParams', 'StationGroupsFactory', 
                        function($stateParams, StationGroupsFactory) {
                            var stationId = $stateParams.station_id;
                            return StationGroupsFactory.getGroupMeasurementFrequencies(stationId)
                                .then(function(response) {
                                    return response.data;
                                });
                    }],
                    _groupMeasurementFrequencies: ['_groupMeasurementFrequenciesList', 
                        function(_groupMeasurementFrequenciesList) {
                            var groupsMeasurementFrequencies = {};
                            for (var i = 0; i < _groupMeasurementFrequenciesList.length; i++) {
                                groupsMeasurementFrequencies[_groupMeasurementFrequenciesList[i].group_id] = _groupMeasurementFrequenciesList[i];
                            }
                            return groupsMeasurementFrequencies;
                    }],
                    _groupsQCLevelList: ['$stateParams', 'StationGroupsFactory', 
                        function($stateParams, StationGroupsFactory) {
                            var stationId = $stateParams.station_id;
                            return StationGroupsFactory.getGroupsQCLevels(stationId)
                                .then(function(response) {
                                    return response.data;
                                });
                    }],
                    _groupsQCLevels: ['_groupsQCLevelList', function(_groupsQCLevelList) {
                        var groupsQCLevels = {};
                        for (var i = 0; i < _groupsQCLevelList.length; i++) {
                            var groupId = _groupsQCLevelList[i].group_id;
                            var groupNotInObject = !(groupId in groupsQCLevels);
                            if (groupNotInObject) {
                                groupsQCLevels[groupId] = [];
                            }
                            groupsQCLevels[groupId].push(_groupsQCLevelList[i]);
                        }
                        return groupsQCLevels;
                    }],
                    _groups: ['_groupList', '_getGroupsParameters', '_groupMeasurementFrequencies', '_groupUnits', '_groupsQCLevels',
                        function(_groupList, _getGroupsParameters, _groupMeasurementFrequencies, _groupUnits, _groupsQCLevels) {
                        var groups = {};
                        
                        for (var i = 0; i < _groupList.length; i++) {
                            var groupId = _groupList[i].group_id;
                            groups[groupId] = _groupList[i];
                            groups[groupId]['parameters'] = {
                                'list': [],
                                'objects': {}
                            };
                            groups[groupId]['frequencies'] = {
                                'list': [],
                                'selected': undefined
                            };
                            groups[groupId]['units'] = {
                                'list': []
                            };
                            groups[groupId]['qc_levels'] = {
                                'list': [],
                                'selected': [],
                                'objects': {}
                            };
                            
                            var groupInParameters = (groupId in _getGroupsParameters);

                            if (groupInParameters) {
                                groups[groupId].parameters.list = _getGroupsParameters[groupId];
                                for (var j = 0; j < _getGroupsParameters[groupId].length; j++) {
                                    var parameterId = _getGroupsParameters[groupId][j].parameter_id;
                                    groups[groupId].parameters.objects[parameterId] = {
                                        'parameter_description': _getGroupsParameters[groupId][j].parameter_description,
                                        'parameter_name': _getGroupsParameters[groupId][j].parameter_name,
                                        'parameter_unit': _getGroupsParameters[groupId][j].parameter_unit
                                    };
                                }
                            }
                            
                            var groupInMeasurementFrequencies = (groupId in _groupMeasurementFrequencies);

                            if (groupInMeasurementFrequencies) {
                                groups[groupId].frequencies.list = _groupMeasurementFrequencies[groupId].measurement_frequencies;
                                groups[groupId].frequencies.selected = 'Dynamic';
                            }
                            
                            var groupInUnits = (groupId in _groupUnits);
                            
                            if (groupInUnits) {
                                groups[groupId].units.list = _groupUnits[groupId];
                            }
                            
                            var groupInQCLevels = (groupId in _groupsQCLevels);
                            
                            if (groupInQCLevels) {
                                groups[groupId].qc_levels.list = _groupsQCLevels[groupId];
                                for (var j = 0; j < _groupsQCLevels[groupId].length; j++) {
                                    var qcLevel = _groupsQCLevels[groupId][j].qc_level;
                                    var noQCLevelSelected = !(groups[groupId].qc_levels.selected.length);
                                    if (noQCLevelSelected) {
                                        groups[groupId].qc_levels.selected.push(qcLevel);
                                    }
                                    
                                    groups[groupId].qc_levels.objects[qcLevel] = {
                                        'qc_description': _groupsQCLevels[groupId][j].qc_description
                                    };
                                }
                            }
                            
                        }

                        return groups;
                    }]
                }
            })
            */
            /*
            .state('station.data.parameters', {
                url: '/parameters',
                templateUrl: 'app/station/station-data-parameters.html',
                controller: 'StationDataParametersCtrl',
                controllerAs: 'stationDataParametersVm',
                resolve: {
                    _station: function(stationStorage) {
                        var station = stationStorage.getStation();
                        return station;
                    }, 
                    _parameterList: ['$stateParams', 'StationParametersFactory', 
                        function($stateParams, StationParametersFactory) {
                            var stationId = $stateParams.station_id;
                            return StationParametersFactory.getParameters(stationId)
                                .then(function(response) {
                                    return response.data;
                                });
                    }],
                    _parameterMeasurementFrequenciesList: ['$stateParams', 'StationParametersFactory', 
                        function($stateParams, StationParametersFactory) {
                            var stationId = $stateParams.station_id;
                            return StationParametersFactory.getParameterMeasurementFrequencies(stationId)
                                .then(function(response) {
                                    return response.data;
                                });
                    }],
                    _parameterMeasurementFrequencies: ['_parameterMeasurementFrequenciesList', 
                        function(_parameterMeasurementFrequenciesList) {
                            var parameterMeasurementFrequencies = {};
                            for (var i = 0; i < _parameterMeasurementFrequenciesList.length; i++) {
                                var parameterId = _parameterMeasurementFrequenciesList[i].parameter_id;
                                var parameterType = _parameterMeasurementFrequenciesList[i].parameter_type;
                                var parameterNotInObject = !(parameterId in parameterMeasurementFrequencies);
                                if (parameterNotInObject) {
                                    parameterMeasurementFrequencies[parameterId] = {};
                                }
                                var parameterTypeNotInObject = !(parameterType in parameterMeasurementFrequencies[parameterId]);
                                if (parameterTypeNotInObject) {
                                    parameterMeasurementFrequencies[parameterId][parameterType] = _parameterMeasurementFrequenciesList[i].measurement_frequencies;
                                }
                            }
                            return parameterMeasurementFrequencies;
                    }],
                    _parameterQCLevelList: ['$stateParams', 'StationParametersFactory', 
                        function($stateParams, StationParametersFactory) {
                            var stationId = $stateParams.station_id;
                            return StationParametersFactory.getParameterQCLevels(stationId)
                                .then(function(response) {
                                    return response.data;
                                });
                    }],
                    _parameterQCLevels: ['_parameterQCLevelList', function(_parameterQCLevelList) {
                        var parameterQCLevels = {};
                        for (var i = 0; i < _parameterQCLevelList.length; i++) {
                            var parameterId = _parameterQCLevelList[i].parameter_id;
                            var parameterType = _parameterQCLevelList[i].parameter_type;
                            var parameterNotInObject = !(parameterId in parameterQCLevels);
                            if (parameterNotInObject) {
                                parameterQCLevels[parameterId] = {};
                            }
                            var parameterTypeNotInObject = !(parameterType in parameterQCLevels[parameterId]);
                            if (parameterTypeNotInObject) {
                                parameterQCLevels[parameterId][parameterType] = [];
                            }
                            parameterQCLevels[parameterId][parameterType].push(_parameterQCLevelList[i]);
                        }
                        return parameterQCLevels;
                    }],
                    _parameterSensorList: ['$stateParams', 'StationParametersFactory',
                        function($stateParams, StationParametersFactory) {
                            var stationId = $stateParams.station_id;
                            return StationParametersFactory.getParameterSensors(stationId)
                                .then(function(response) {
                                    return response.data;
                                });
                    }],
                    _parameterSensors: ['_parameterSensorList', function(_parameterSensorList) {
                        var parameterSensors = {};
                        
                        for (var i = 0; i < _parameterSensorList.length; i++) {
                            var parameterId = _parameterSensorList[i].parameter_id;
                            var parameterType = _parameterSensorList[i].parameter_type;
                            var parameterNotInObject = !(parameterId in parameterSensors);
                            if (parameterNotInObject) {
                                parameterSensors[parameterId] = {};
                            }
                            var parameterTypeNotInObject = !(parameterType in parameterSensors[parameterId]);
                            if (parameterTypeNotInObject) {
                                parameterSensors[parameterId][parameterType] = {};
                            }
                            parameterSensors[parameterId][parameterType] = _parameterSensorList[i];
                        }

                        return parameterSensors;
                    }],
                    _profileParameterVerticalPositions: ['$q', '$stateParams', 'StationParametersFactory', '_parameterList', 
                        function($q, $stateParams, StationParametersFactory, _parameterList) {
                            
                            var stationId = $stateParams.station_id;
                            var profileVerticalPositions = {};
                            var promiseArray = [];
                            
                            for (var i = 0; i < _parameterList.length; i++) {
                                var parameterId = _parameterList[i].parameter_id;
                                var parameterType = _parameterList[i].parameter_type;
                                if (parameterType === 'profile') {
                                    var resource = StationParametersFactory.getProfileParameterVerticalPositions(stationId, parameterId);
                                    promiseArray.push(resource);
                                }
                                
                            }

                            return $q.all(promiseArray).then(function(response) {
                                for (var i = 0; i < response.length; i++) {
                                    for (var j = 0; j < response[i].data.length; j++) {
                                        var parameterId = response[i].data[j].parameter_id;
                                        var parameterNotInObject = !(parameterId in profileVerticalPositions);
                                        if (parameterNotInObject) {
                                            profileVerticalPositions[parameterId] = response[i].data;
                                        }
                                        
                                    }
                                }
                                return profileVerticalPositions;       
                            });
                        
                    }],
                    _parameters: ['_parameterList', '_parameterMeasurementFrequencies', '_parameterQCLevels', '_parameterSensors', '_profileParameterVerticalPositions',
                        function(_parameterList, _parameterMeasurementFrequencies, _parameterQCLevels, _parameterSensors, _profileParameterVerticalPositions) {
                            var parameters = {};
                            for (var i = 0; i < _parameterList.length; i++) {
                                var parameterId = _parameterList[i].parameter_id;
                                var parameterType = _parameterList[i].parameter_type;
                                
                                var parameterNotInParameters = !(parameterId in parameters);
                                if (parameterNotInParameters) {
                                    parameters[parameterId] = {};
                                }
                                
                                var parameterTypeNotInParameters = !(parameterType in parameters[parameterId]);
                                if (parameterTypeNotInParameters) {
                                    parameters[parameterId][parameterType] = {}
                                }
                                
                                parameters[parameterId][parameterType] = _parameterList[i];
                                
                                parameters[parameterId][parameterType]['frequencies'] = {
                                    'list': [],
                                    'selected': undefined
                                };

                                parameters[parameterId][parameterType]['qc_levels'] = {
                                    'list': [],
                                    'selected': [],
                                    'objects': {}
                                };
                                
                                parameters[parameterId][parameterType]['sensors'] = {};
                                
                                parameters[parameterId][parameterType]['vertical_positions'] = [];
                                
                                var parameterIdInMeasurementFrequencies = (parameterId in _parameterMeasurementFrequencies);

                                if (parameterIdInMeasurementFrequencies) {
                                    var parameterTypeInMeasurementFrequencies = (parameterType in _parameterMeasurementFrequencies[parameterId]);
                                    if (parameterTypeInMeasurementFrequencies) {
                                        parameters[parameterId][parameterType].frequencies.list = _parameterMeasurementFrequencies[parameterId][parameterType];
                                        parameters[parameterId][parameterType].frequencies.selected = 'Dynamic';
                                    }
                                }
                                
                                var parameterInQCLevels = (parameterId in _parameterQCLevels);
                                
                                if (parameterInQCLevels) {
                                    
                                    var parameterTypeInQCLevels = (parameterType in _parameterQCLevels[parameterId]);
                                    if (parameterTypeInQCLevels) {
                                        parameters[parameterId][parameterType].qc_levels.list = _parameterQCLevels[parameterId][parameterType];
                                        for (var j = 0; j < _parameterQCLevels[parameterId][parameterType].length; j++) {
                                            var qcLevel = _parameterQCLevels[parameterId][parameterType][j].qc_level;
                                            var noQCLevelSelected = !(parameters[parameterId][parameterType].qc_levels.selected.length);
                                            if (noQCLevelSelected) {
                                                parameters[parameterId][parameterType].qc_levels.selected.push(qcLevel);
                                            }
                                            
                                            parameters[parameterId][parameterType].qc_levels.objects[qcLevel] = {
                                                'qc_description': _parameterQCLevels[parameterId][parameterType][j].qc_description
                                            };
                                        }
                                    }
                                    
                                }
                                
                                var parameterInSensors = (parameterId in _parameterSensors);
                                if (parameterInSensors) {
                                    var parameterTypeInSensors = (parameterType in _parameterSensors[parameterId]);
                                    if (parameterTypeInSensors) {
                                        parameters[parameterId][parameterType].sensors = _parameterSensors[parameterId][parameterType];
                                    }
                                }
                                
                                if (parameterType === 'profile') {
                                    var parameterInProfileVerticalPositions = (parameterId in _profileParameterVerticalPositions);
                                    if (parameterInProfileVerticalPositions) {
                                        parameters[parameterId][parameterType]['vertical_positions'] = _profileParameterVerticalPositions[parameterId];
                                    }
                                }
                                
                            }
    
                        return parameters;
                    }]
                }
                    
            })
            */
            .state('station.cams-and-photos', {
                url: '/cams-and-photos',
                templateUrl: 'app/station/station-cams-and-photos.html',
                abstract: true,
                controller: 'StationCamsAndPhotosCtrl',
                controllerAs: 'stationCamsAndPhotosVm',
                resolve: {}
                
            })
            .state('station.cams-and-photos.livewebcams', {
                url: '/livewebcams',
                templateUrl: 'app/station/station-cams-and-photos-livewebcams.html',
                controller: 'StationCamsAndPhotosLiveWebcamsCtrl',
                controllerAs: 'stationCamsAndPhotosLiveWebcamsCtrlVm',
                resolve: {
                    _liveWebcams: function($stateParams, StationWebcamsFactory, stationStorage) {
                        var stationId = $stateParams.station_id;
                        return StationWebcamsFactory.getLiveWebcams(stationId)
                            .then(function(response) {
                                var data = response.data;
                                stationStorage.setLiveWebcamList(data);
                                return data;
                            });
                    }
                }
                
            })
            .state('station.cams-and-photos.videos', {
                url: '/videos',
                templateUrl: 'app/station/station-cams-and-photos-videos.html',
                controller: 'StationCamsAndPhotosVideosCtrl',
                controllerAs: 'stationCamsAndPhotosVideosCtrlVm',
                resolve: {
                }
                
            })
            .state('station.cams-and-photos.photos', {
                url: '/photos',
                templateUrl: 'app/station/station-cams-and-photos-photos.html',
                controller: 'StationCamsAndPhotosPhotosCtrl',
                controllerAs: 'stationCamsAndPhotosPhotosCtrlVm',
                resolve: {
                }
                
            })
        
    }
    
})();
