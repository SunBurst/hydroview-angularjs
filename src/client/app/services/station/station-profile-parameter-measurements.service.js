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
            
            getDailyProfileParameterMeasurements: getDailyProfileParameterMeasurements,
            getHourlyProfileParameterMeasurements: getHourlyProfileParameterMeasurements,
            getThirtyMinProfileParameterMeasurements: getThirtyMinProfileParameterMeasurements,
            getTwentyMinProfileParameterMeasurements: getTwentyMinProfileParameterMeasurements,
            getFifteenMinProfileParameterMeasurements: getFifteenMinProfileParameterMeasurements,
            getTenMinProfileParameterMeasurements: getTenMinProfileParameterMeasurements,
            getFiveMinProfileParameterMeasurements: getFiveMinProfileParameterMeasurements,
            getOneMinProfileParameterMeasurements: getOneMinProfileParameterMeasurements,
            getOneSecProfileParameterMeasurements: getOneSecProfileParameterMeasurements
            
        };
        
        function getDailyProfileParameterMeasurements(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp, dataSets, orderBy) {
            var resource = $resource(restApiBaseUrl + '/api/daily_profile_parameter_measurements_by_sensor?sensor_id=:sensor_id&parameter_id=:parameter_id&qc_level=:qc_level&from_timestamp=:from_timestamp&to_timestamp=:to_timestamp&data_sets=:data_sets&order_by=:order_by', {}, {
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
                .then(getDailyProfileParameterMeasurementsComplete)
                .catch(getDailyProfileParameterMeasurementsFailed);
                
            function getDailyProfileParameterMeasurementsComplete(response) {
                return response;
            }
            
            function getDailyProfileParameterMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
        function getHourlyProfileParameterMeasurements(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp, dataSets, orderBy) {
            var resource = $resource(restApiBaseUrl + '/api/hourly_profile_parameter_measurements_by_sensor?sensor_id=:sensor_id&parameter_id=:parameter_id&qc_level=:qc_level&from_timestamp=:from_timestamp&to_timestamp=:to_timestamp&data_sets=:data_sets&order_by=:order_by', {}, {
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
                .then(getHourlyProfileParameterMeasurementsComplete)
                .catch(getHourlyProfileParameterMeasurementsFailed);
                
            function getHourlyProfileParameterMeasurementsComplete(response) {
                return response;
            }
            
            function getHourlyProfileParameterMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
        function getThirtyMinProfileParameterMeasurements(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp, dataSets, orderBy) {
            var resource = $resource(restApiBaseUrl + '/api/thirty_min_profile_parameter_measurements_by_sensor?sensor_id=:sensor_id&parameter_id=:parameter_id&qc_level=:qc_level&from_timestamp=:from_timestamp&to_timestamp=:to_timestamp&data_sets=:data_sets&order_by=:order_by', {}, {
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
                .then(getThirtyMinProfileParameterMeasurementsComplete)
                .catch(getThirtyMinProfileParameterMeasurementsFailed);
                
            function getThirtyMinProfileParameterMeasurementsComplete(response) {
                return response;
            }
            
            function getThirtyMinProfileParameterMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
        function getThirtyMinProfileParameterMeasurementsChart(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp, dataSets, orderBy) {
            var resource = $resource(restApiBaseUrl + '/api/thirty_min_profile_parameter_measurements_by_sensor?sensor_id=:sensor_id&parameter_id=:parameter_id&qc_level=:qc_level&from_timestamp=:from_timestamp&to_timestamp=:to_timestamp&data_sets=:data_sets&order_by=:order_by', {}, {
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
                    isArray: false,
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
                .then(getThirtyMinProfileParameterMeasurementsChartComplete)
                .catch(getThirtyMinProfileParameterMeasurementsChartFailed);
                
            function getThirtyMinProfileParameterMeasurementsChartComplete(response) {
                return response;
            }
            
            function getThirtyMinProfileParameterMeasurementsChartFailed(error) {
                console.log(error);
            }
        
        }
        
        function getTwentyMinProfileParameterMeasurements(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp, dataSets, orderBy) {
            var resource = $resource(restApiBaseUrl + '/api/twenty_min_profile_parameter_measurements_by_sensor?sensor_id=:sensor_id&parameter_id=:parameter_id&qc_level=:qc_level&from_timestamp=:from_timestamp&to_timestamp=:to_timestamp&data_sets=:data_sets&order_by=:order_by', {}, {
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
                .then(getTwentyMinProfileParameterMeasurementsComplete)
                .catch(getTwentyMinProfileParameterMeasurementsFailed);
                
            function getTwentyMinProfileParameterMeasurementsComplete(response) {
                return response;
            }
            
            function getTwentyMinProfileParameterMeasurementsFailed(error) {
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
        
        function getTenMinProfileParameterMeasurements(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp, dataSets, orderBy) {
            var resource = $resource(restApiBaseUrl + '/api/ten_min_profile_parameter_measurements_by_sensor?sensor_id=:sensor_id&parameter_id=:parameter_id&qc_level=:qc_level&from_timestamp=:from_timestamp&to_timestamp=:to_timestamp&data_sets=:data_sets&order_by=:order_by', {}, {
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
                .then(getTenMinProfileParameterMeasurementsComplete)
                .catch(getTenMinProfileParameterMeasurementsFailed);
                
            function getTenMinProfileParameterMeasurementsComplete(response) {
                return response;
            }
            
            function getTenMinProfileParameterMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
        function getFiveMinProfileParameterMeasurements(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp, dataSets, orderBy) {
            var resource = $resource(restApiBaseUrl + '/api/five_min_profile_parameter_measurements_by_sensor?sensor_id=:sensor_id&parameter_id=:parameter_id&qc_level=:qc_level&from_timestamp=:from_timestamp&to_timestamp=:to_timestamp&data_sets=:data_sets&order_by=:order_by', {}, {
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
                .then(getFiveMinProfileParameterMeasurementsComplete)
                .catch(getFiveMinProfileParameterMeasurementsFailed);
                
            function getFiveMinProfileParameterMeasurementsComplete(response) {
                return response;
            }
            
            function getFiveMinProfileParameterMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
        function getOneMinProfileParameterMeasurements(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp, dataSets, orderBy) {
            var resource = $resource(restApiBaseUrl + '/api/one_min_profile_parameter_measurements_by_sensor?sensor_id=:sensor_id&parameter_id=:parameter_id&qc_level=:qc_level&from_timestamp=:from_timestamp&to_timestamp=:to_timestamp&data_sets=:data_sets&order_by=:order_by', {}, {
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
                .then(getOneMinProfileParameterMeasurementsComplete)
                .catch(getOneMinProfileParameterMeasurementsFailed);
                
            function getOneMinProfileParameterMeasurementsComplete(response) {
                return response;
            }
            
            function getOneMinProfileParameterMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
        function getOneSecProfileParameterMeasurements(stationId, parameterId, qcLevel, fromTimestamp, toTimestamp, dataSets, orderBy) {
            var resource = $resource(restApiBaseUrl + '/api/one_sec_profile_parameter_measurements_by_sensor?sensor_id=:sensor_id&parameter_id=:parameter_id&qc_level=:qc_level&from_timestamp=:from_timestamp&to_timestamp=:to_timestamp&data_sets=:data_sets&order_by=:order_by', {}, {
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
                .then(getOneSecProfileParameterMeasurementsComplete)
                .catch(getOneSecProfileParameterMeasurementsFailed);
                
            function getOneSecProfileParameterMeasurementsComplete(response) {
                return response;
            }
            
            function getOneSecProfileParameterMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
    }

})();
