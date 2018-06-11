(function() {
    'use strict';
    
    angular
        .module('app.services')
        .factory('stationProfileParameterMeasurements', stationProfileParameterMeasurements);
    
    stationProfileParameterMeasurements.$inject = ['$resource', 'EnvironmentConfig'];
    
    function stationProfileParameterMeasurements($resource, EnvironmentConfig) {

        var restApiBaseUrl = EnvironmentConfig.API;
        var customInterceptor = {
            response: function(response) {
                return response;
            }
        };
        
        return {
            
            getDailyProfileMeasurements: getDailyProfileMeasurements,
            getDailyProfileMeasurementsChart: getDailyProfileMeasurementsChart,
            getHourlyProfileMeasurements: getHourlyProfileMeasurements,
            getHourlyProfileMeasurementsChart: getHourlyProfileMeasurementsChart,
            getThirtyMinProfileMeasurements: getThirtyMinProfileMeasurements,
            getThirtyMinProfileMeasurementsChart: getThirtyMinProfileMeasurementsChart,
            getTwentyMinProfileMeasurements: getTwentyMinProfileMeasurements,
            getTwentyMinProfileMeasurementsChart: getTwentyMinProfileMeasurementsChart,
            getFifteenMinProfileParameterMeasurements: getFifteenMinProfileParameterMeasurements,
            getTenMinProfileMeasurements: getTenMinProfileMeasurements,
            getTenMinProfileMeasurementsChart: getTenMinProfileMeasurementsChart,
            getFiveMinProfileMeasurements: getFiveMinProfileMeasurements,
            getFiveMinProfileMeasurementsChart: getFiveMinProfileMeasurementsChart,
            getOneMinProfileMeasurements: getOneMinProfileMeasurements,
            getOneMinProfileMeasurementsChart: getOneMinProfileMeasurementsChart,
            getOneSecProfileMeasurements: getOneSecProfileMeasurements,
            getOneSecProfileMeasurementsChart: getOneSecProfileMeasurementsChart
            
        };
        
        function getDailyProfileMeasurements(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource(restApiBaseUrl + '/api/daily_profile_measurements_by_station/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter_id: parameterId,
                        qc_level: qcLevel,
                        from_timestamp: fromTimestamp,
                        to_timestamp: toTimestamp
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({
                station_id: stationId, 
                parameter_id: parameterId, 
                qc_level: qcLevel, 
                from_timestamp: fromTimestamp, 
                to_timestamp: toTimestamp
            }).$promise
                .then(getDailyProfileMeasurementsComplete)
                .catch(getDailyProfileMeasurementsFailed);
                
            function getDailyProfileMeasurementsComplete(response) {
                return response;
            }
            
            function getDailyProfileMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
        function getDailyProfileMeasurementsChart(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource(restApiBaseUrl + '/api/daily_profile_measurements_by_station_chart/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter_id: parameterId,
                        qc_level: qcLevel,
                        from_timestamp: fromTimestamp,
                        to_timestamp: toTimestamp
                    },
                    isArray: false,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({
                station_id: stationId, 
                parameter_id: parameterId, 
                qc_level: qcLevel, 
                from_timestamp: fromTimestamp, 
                to_timestamp: toTimestamp
            }).$promise
                .then(getDailyProfileMeasurementsChartComplete)
                .catch(getDailyProfileMeasurementsChartFailed);
                
            function getDailyProfileMeasurementsChartComplete(response) {
                return response;
            }
            
            function getDailyProfileMeasurementsChartFailed(error) {
                console.log(error);
            }
        
        }
        
        function getHourlyProfileMeasurements(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource(restApiBaseUrl + '/api/hourly_profile_measurements_by_station/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter_id: parameterId,
                        qc_level: qcLevel,
                        from_timestamp: fromTimestamp,
                        to_timestamp: toTimestamp
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({
                station_id: stationId, 
                parameter_id: parameterId, 
                qc_level: qcLevel, 
                from_timestamp: fromTimestamp, 
                to_timestamp: toTimestamp
            }).$promise
                .then(getHourlyProfileMeasurementsComplete)
                .catch(getHourlyProfileMeasurementsFailed);
                
            function getHourlyProfileMeasurementsComplete(response) {
                return response;
            }
            
            function getHourlyProfileMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
        function getHourlyProfileMeasurementsChart(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource(restApiBaseUrl + '/api/hourly_profile_measurements_by_station_chart/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter_id: parameterId,
                        qc_level: qcLevel,
                        from_timestamp: fromTimestamp,
                        to_timestamp: toTimestamp
                    },
                    isArray: false,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({
                station_id: stationId, 
                parameter_id: parameterId, 
                qc_level: qcLevel, 
                from_timestamp: fromTimestamp, 
                to_timestamp: toTimestamp
            }).$promise
                .then(getHourlyProfileMeasurementsChartComplete)
                .catch(getHourlyProfileMeasurementsChartFailed);
                
            function getHourlyProfileMeasurementsChartComplete(response) {
                return response;
            }
            
            function getHourlyProfileMeasurementsChartFailed(error) {
                console.log(error);
            }
        
        }
        
        function getThirtyMinProfileMeasurements(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource(restApiBaseUrl + '/api/thirty_min_profile_measurements_by_station/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter_id: parameterId,
                        qc_level: qcLevel,
                        from_timestamp: fromTimestamp,
                        to_timestamp: toTimestamp
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({
                station_id: stationId, 
                parameter_id: parameterId, 
                qc_level: qcLevel, 
                from_timestamp: fromTimestamp, 
                to_timestamp: toTimestamp
            }).$promise
                .then(getThirtyMinProfileMeasurementsComplete)
                .catch(getThirtyMinProfileMeasurementsFailed);
                
            function getThirtyMinProfileMeasurementsComplete(response) {
                return response;
            }
            
            function getThirtyMinProfileMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
        function getThirtyMinProfileMeasurementsChart(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource(restApiBaseUrl + '/api/thirty_min_profile_measurements_by_station_chart/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter_id: parameterId,
                        qc_level: qcLevel,
                        from_timestamp: fromTimestamp,
                        to_timestamp: toTimestamp
                    },
                    isArray: false,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({
                station_id: stationId, 
                parameter_id: parameterId, 
                qc_level: qcLevel, 
                from_timestamp: fromTimestamp, 
                to_timestamp: toTimestamp
            }).$promise
                .then(getThirtyMinProfileMeasurementsChartComplete)
                .catch(getThirtyMinProfileMeasurementsChartFailed);
                
            function getThirtyMinProfileMeasurementsChartComplete(response) {
                return response;
            }
            
            function getThirtyMinProfileMeasurementsChartFailed(error) {
                console.log(error);
            }
        
        }
        
        function getTwentyMinProfileMeasurements(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource(restApiBaseUrl + '/api/twenty_min_profile_measurements_by_station/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter_id: parameterId,
                        qc_level: qcLevel,
                        from_timestamp: fromTimestamp,
                        to_timestamp: toTimestamp
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({
                station_id: stationId, 
                parameter_id: parameterId, 
                qc_level: qcLevel, 
                from_timestamp: fromTimestamp, 
                to_timestamp: toTimestamp
            }).$promise
                .then(getTwentyMinProfileMeasurementsComplete)
                .catch(getTwentyMinProfileMeasurementsFailed);
                
            function getTwentyMinProfileMeasurementsComplete(response) {
                return response;
            }
            
            function getTwentyMinProfileMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
        function getTwentyMinProfileMeasurementsChart(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource(restApiBaseUrl + '/api/twenty_min_profile_measurements_by_station_chart/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter_id: parameterId,
                        qc_level: qcLevel,
                        from_timestamp: fromTimestamp,
                        to_timestamp: toTimestamp
                    },
                    isArray: false,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({
                station_id: stationId, 
                parameter_id: parameterId, 
                qc_level: qcLevel, 
                from_timestamp: fromTimestamp, 
                to_timestamp: toTimestamp
            }).$promise
                .then(getTwentyMinProfileMeasurementsChartComplete)
                .catch(getTwentyMinProfileMeasurementsChartFailed);
                
            function getTwentyMinProfileMeasurementsChartComplete(response) {
                return response;
            }
            
            function getTwentyMinProfileMeasurementsChartFailed(error) {
                console.log(error);
            }
        
        }
        
        function getFifteenMinProfileParameterMeasurements(sensorId, parameterId, qcLevel, fromTimestamp, toTimestamp, dataSets, orderBy) {
            var resource = $resource(restApiBaseUrl + '/api/fifteen_min_profile_parameter_measurements_by_sensor?sensor_id=:sensor_id&parameter_id=:parameter_id&qc_level=:qc_level&from_timestamp=:from_timestamp&to_timestamp=:to_timestamp&data_sets=:data_sets&order_by=:order_by', {}, {
                query: {
                    method: 'GET', params: {
                        sensor_id: sensorId,
                        parameter_id: parameterId,
                        qc_level: qcLevel,
                        from_timestamp: fromTimestamp,
                        to_timestamp: toTimestamp,
                        data_sets: dataSets,
                        order_by: orderBy
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({
                sensor_id: sensorId, 
                parameter_id: parameterId, 
                qc_level: qcLevel, 
                from_timestamp: fromTimestamp, 
                to_timestamp: toTimestamp,
                data_sets: dataSets,
                order_by: orderBy
            }).$promise
                .then(getFifteenMinProfileParameterMeasurementsComplete)
                .catch(getFifteenMinProfileParameterMeasurementsFailed);
                
            function getFifteenMinProfileParameterMeasurementsComplete(response) {
                return response;
            }
            
            function getFifteenMinProfileParameterMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
        function getTenMinProfileMeasurements(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource(restApiBaseUrl + '/api/ten_min_profile_measurements_by_station/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter_id: parameterId,
                        qc_level: qcLevel,
                        from_timestamp: fromTimestamp,
                        to_timestamp: toTimestamp
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({
                station_id: stationId, 
                parameter_id: parameterId, 
                qc_level: qcLevel, 
                from_timestamp: fromTimestamp, 
                to_timestamp: toTimestamp
            }).$promise
                .then(getTenMinProfileMeasurementsComplete)
                .catch(getTenMinProfileMeasurementsFailed);
                
            function getTenMinProfileMeasurementsComplete(response) {
                return response;
            }
            
            function getTenMinProfileMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
        function getTenMinProfileMeasurementsChart(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource(restApiBaseUrl + '/api/ten_min_profile_measurements_by_station_chart/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter_id: parameterId,
                        qc_level: qcLevel,
                        from_timestamp: fromTimestamp,
                        to_timestamp: toTimestamp
                    },
                    isArray: false,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({
                station_id: stationId, 
                parameter_id: parameterId, 
                qc_level: qcLevel, 
                from_timestamp: fromTimestamp, 
                to_timestamp: toTimestamp
            }).$promise
                .then(getTenMinProfileMeasurementsChartComplete)
                .catch(getTenMinProfileMeasurementsChartFailed);
                
            function getTenMinProfileMeasurementsChartComplete(response) {
                return response;
            }
            
            function getTenMinProfileMeasurementsChartFailed(error) {
                console.log(error);
            }
        
        }
        
        function getFiveMinProfileMeasurements(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource(restApiBaseUrl + '/api/five_min_profile_measurements_by_station/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter_id: parameterId,
                        qc_level: qcLevel,
                        from_timestamp: fromTimestamp,
                        to_timestamp: toTimestamp
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({
                station_id: stationId, 
                parameter_id: parameterId, 
                qc_level: qcLevel, 
                from_timestamp: fromTimestamp, 
                to_timestamp: toTimestamp
            }).$promise
                .then(getFiveMinProfileMeasurementsComplete)
                .catch(getFiveMinProfileMeasurementsFailed);
                
            function getFiveMinProfileMeasurementsComplete(response) {
                return response;
            }
            
            function getFiveMinProfileMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
        function getFiveMinProfileMeasurementsChart(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource(restApiBaseUrl + '/api/five_min_profile_measurements_by_station_chart/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter_id: parameterId,
                        qc_level: qcLevel,
                        from_timestamp: fromTimestamp,
                        to_timestamp: toTimestamp
                    },
                    isArray: false,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({
                station_id: stationId, 
                parameter_id: parameterId, 
                qc_level: qcLevel, 
                from_timestamp: fromTimestamp, 
                to_timestamp: toTimestamp
            }).$promise
                .then(getFiveMinProfileMeasurementsChartComplete)
                .catch(getFiveMinProfileMeasurementsChartFailed);
                
            function getFiveMinProfileMeasurementsChartComplete(response) {
                return response;
            }
            
            function getFiveMinProfileMeasurementsChartFailed(error) {
                console.log(error);
            }
        
        }
        
        function getOneMinProfileMeasurements(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource(restApiBaseUrl + '/api/one_min_profile_measurements_by_station/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter_id: parameterId,
                        qc_level: qcLevel,
                        from_timestamp: fromTimestamp,
                        to_timestamp: toTimestamp
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({
                station_id: stationId, 
                parameter_id: parameterId, 
                qc_level: qcLevel, 
                from_timestamp: fromTimestamp, 
                to_timestamp: toTimestamp
            }).$promise
                .then(getOneMinProfileMeasurementsComplete)
                .catch(getOneMinProfileMeasurementsFailed);
                
            function getOneMinProfileMeasurementsComplete(response) {
                return response;
            }
            
            function getOneMinProfileMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
        function getOneMinProfileMeasurementsChart(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource(restApiBaseUrl + '/api/one_min_profile_measurements_by_station_chart/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter_id: parameterId,
                        qc_level: qcLevel,
                        from_timestamp: fromTimestamp,
                        to_timestamp: toTimestamp
                    },
                    isArray: false,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({
                station_id: stationId, 
                parameter_id: parameterId, 
                qc_level: qcLevel, 
                from_timestamp: fromTimestamp, 
                to_timestamp: toTimestamp
            }).$promise
                .then(getOneMinProfileMeasurementsChartComplete)
                .catch(getOneMinProfileMeasurementsChartFailed);
                
            function getOneMinProfileMeasurementsChartComplete(response) {
                return response;
            }
            
            function getOneMinProfileMeasurementsChartFailed(error) {
                console.log(error);
            }
        
        }
        
        function getOneSecProfileMeasurements(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource(restApiBaseUrl + '/api/one_sec_profile_measurements_by_station/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter_id: parameterId,
                        qc_level: qcLevel,
                        from_timestamp: fromTimestamp,
                        to_timestamp: toTimestamp
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({
                station_id: stationId, 
                parameter_id: parameterId, 
                qc_level: qcLevel, 
                from_timestamp: fromTimestamp, 
                to_timestamp: toTimestamp
            }).$promise
                .then(getOneSecProfileMeasurementsComplete)
                .catch(getOneSecProfileMeasurementsFailed);
                
            function getOneSecProfileMeasurementsComplete(response) {
                return response;
            }
            
            function getOneSecProfileMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
        function getOneSecProfileMeasurementsChart(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp) {
            var resource = $resource(restApiBaseUrl + '/api/one_sec_profile_measurements_by_station_chart/:station_id/:parameter_id/:qc_level/:from_timestamp/:to_timestamp', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        parameter_id: parameterId,
                        qc_level: qcLevel,
                        from_timestamp: fromTimestamp,
                        to_timestamp: toTimestamp
                    },
                    isArray: false,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({
                station_id: stationId, 
                parameter_id: parameterId, 
                qc_level: qcLevel, 
                from_timestamp: fromTimestamp, 
                to_timestamp: toTimestamp
            }).$promise
                .then(getOneSecProfileMeasurementsChartComplete)
                .catch(getOneSecProfileMeasurementsChartFailed);
                
            function getOneSecProfileMeasurementsChartComplete(response) {
                return response;
            }
            
            function getOneSecProfileMeasurementsChartFailed(error) {
                console.log(error);
            }
        
        }
        
    }

})();
