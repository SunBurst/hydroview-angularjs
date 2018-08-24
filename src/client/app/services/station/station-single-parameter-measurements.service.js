(function() {
    'use strict';
    
    angular
        .module('app.services')
        .factory('stationSingleParameterMeasurements', stationSingleParameterMeasurements);
    
    stationSingleParameterMeasurements.$inject = ['$resource', 'EnvironmentConfig'];
    
    function stationSingleParameterMeasurements($resource, EnvironmentConfig) {

        var restApiBaseUrl = EnvironmentConfig.API;
        var customInterceptor = {
            response: function(response) {
                return response;
            }
        };
        
        return {
            getDailySingleParameterMeasurements: getDailySingleParameterMeasurements,
            getHourlySingleParameterMeasurements: getHourlySingleParameterMeasurements,
            getThirtyMinSingleParameterMeasurements: getThirtyMinSingleParameterMeasurements,
            getTwentyMinSingleParameterMeasurements: getTwentyMinSingleParameterMeasurements,
            getFifteenMinSingleParameterMeasurements: getFifteenMinSingleParameterMeasurements,
            getTenMinSingleParameterMeasurements: getTenMinSingleParameterMeasurements,
            getFiveMinSingleParameterMeasurements: getFiveMinSingleParameterMeasurements,
            getOneMinSingleParameterMeasurements: getOneMinSingleParameterMeasurements,
            getOneSecSingleParameterMeasurements: getOneSecSingleParameterMeasurements, 
        };
        
        function getDailySingleParameterMeasurements(sensorId, parameterId, qcLevel, fromTimestamp, toTimestamp, dataSets, orderBy) {
            var resource = $resource(restApiBaseUrl + '/api/daily_single_parameter_measurements_by_sensor?sensor_id=:sensor_id&parameter_id=:parameter_id&qc_level=:qc_level&from_timestamp=:from_timestamp&to_timestamp=:to_timestamp&data_sets=:data_sets&order_by=:order_by', {}, {
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
                .then(getDailySingleParameterMeasurementsComplete)
                .catch(getDailySingleParameterMeasurementsFailed);
                
            function getDailySingleParameterMeasurementsComplete(response) {
                return response;
            }
            
            function getDailySingleParameterMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
        function getHourlySingleParameterMeasurements(sensorId, parameterId, qcLevel, fromTimestamp, toTimestamp, dataSets, orderBy) {
            var resource = $resource(restApiBaseUrl + '/api/hourly_single_parameter_measurements_by_sensor?sensor_id=:sensor_id&parameter_id=:parameter_id&qc_level=:qc_level&from_timestamp=:from_timestamp&to_timestamp=:to_timestamp&data_sets=:data_sets&order_by=:order_by', {}, {
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
                .then(getHourlySingleParameterMeasurementsComplete)
                .catch(getHourlySingleParameterMeasurementsFailed);
                
            function getHourlySingleParameterMeasurementsComplete(response) {
                return response;
            }
            
            function getHourlySingleParameterMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
        function getThirtyMinSingleParameterMeasurements(sensorId, parameterId, qcLevel, fromTimestamp, toTimestamp, dataSets, orderBy) {
            var resource = $resource(restApiBaseUrl + '/api/thirty_min_single_parameter_measurements_by_sensor?sensor_id=:sensor_id&parameter_id=:parameter_id&qc_level=:qc_level&from_timestamp=:from_timestamp&to_timestamp=:to_timestamp&data_sets=:data_sets&order_by=:order_by', {}, {
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
                .then(getThirtyMinSingleParameterMeasurementsComplete)
                .catch(getThirtyMinSingleParameterMeasurementsFailed);
                
            function getThirtyMinSingleParameterMeasurementsComplete(response) {
                return response;
            }
            
            function getThirtyMinSingleParameterMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
        function getTwentyMinSingleParameterMeasurements(sensorId, parameterId, qcLevel, fromTimestamp, toTimestamp, dataSets, orderBy) {
            var resource = $resource(restApiBaseUrl + '/api/twenty_min_single_parameter_measurements_by_sensor?sensor_id=:sensor_id&parameter_id=:parameter_id&qc_level=:qc_level&from_timestamp=:from_timestamp&to_timestamp=:to_timestamp&data_sets=:data_sets&order_by=:order_by', {}, {
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
                .then(getTwentyMinSingleParameterMeasurementsComplete)
                .catch(getTwentyMinSingleParameterMeasurementsFailed);
                
            function getTwentyMinSingleParameterMeasurementsComplete(response) {
                return response;
            }
            
            function getTwentyMinSingleParameterMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
        function getFifteenMinSingleParameterMeasurements(sensorId, parameterId, qcLevel, fromTimestamp, toTimestamp, dataSets, orderBy) {
            var resource = $resource(restApiBaseUrl + '/api/fifteen_min_single_parameter_measurements_by_sensor?sensor_id=:sensor_id&parameter_id=:parameter_id&qc_level=:qc_level&from_timestamp=:from_timestamp&to_timestamp=:to_timestamp&data_sets=:data_sets&order_by=:order_by', {}, {
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
                .then(getFifteenMinSingleParameterMeasurementsComplete)
                .catch(getFifteenMinSingleParameterMeasurementsFailed);
                
            function getFifteenMinSingleParameterMeasurementsComplete(response) {
                return response;
            }
            
            function getFifteenMinSingleParameterMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
        function getTenMinSingleParameterMeasurements(sensorId, parameterId, qcLevel, fromTimestamp, toTimestamp, dataSets, orderBy) {
            var resource = $resource(restApiBaseUrl + '/api/ten_min_single_parameter_measurements_by_sensor?sensor_id=:sensor_id&parameter_id=:parameter_id&qc_level=:qc_level&from_timestamp=:from_timestamp&to_timestamp=:to_timestamp&data_sets=:data_sets&order_by=:order_by', {}, {
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
                .then(getTenMinSingleParameterMeasurementsComplete)
                .catch(getTenMinSingleParameterMeasurementsFailed);
                
            function getTenMinSingleParameterMeasurementsComplete(response) {
                return response;
            }
            
            function getTenMinSingleParameterMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
        function getFiveMinSingleParameterMeasurements(sensorId, parameterId, qcLevel, fromTimestamp, toTimestamp, dataSets, orderBy) {
            var resource = $resource(restApiBaseUrl + '/api/five_min_single_parameter_measurements_by_sensor?sensor_id=:sensor_id&parameter_id=:parameter_id&qc_level=:qc_level&from_timestamp=:from_timestamp&to_timestamp=:to_timestamp&data_sets=:data_sets&order_by=:order_by', {}, {
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
                .then(getFiveMinSingleParameterMeasurementsComplete)
                .catch(getFiveMinSingleParameterMeasurementsFailed);
                
            function getFiveMinSingleParameterMeasurementsComplete(response) {
                return response;
            }
            
            function getFiveMinSingleParameterMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
        function getOneMinSingleParameterMeasurements(sensorId, parameterId, qcLevel, fromTimestamp, toTimestamp, dataSets, orderBy) {
            var resource = $resource(restApiBaseUrl + '/api/one_min_single_parameter_measurements_by_station?sensor_id=:sensor_id&parameter_id=:parameter_id&qc_level=:qc_level&from_timestamp=:from_timestamp&to_timestamp=:to_timestamp&data_sets=:data_sets&order_by=:order_by', {}, {
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
                .then(getOneMinSingleParameterMeasurementsComplete)
                .catch(getOneMinSingleParameterMeasurementsFailed);
                
            function getOneMinSingleParameterMeasurementsComplete(response) {
                return response;
            }
            
            function getOneMinSingleParameterMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
        function getOneSecSingleParameterMeasurements(sensorId, parameterId, qcLevel, fromTimestamp, toTimestamp, dataSets, orderBy) {
            var resource = $resource(restApiBaseUrl + '/api/one_sec_single_parameter_measurements_by_sensor?sensor_id=:sensor_id&parameter_id=:parameter_id&qc_level=:qc_level&from_timestamp=:from_timestamp&to_timestamp=:to_timestamp&data_sets=:data_sets&order_by=:order_by', {}, {
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
                .then(getOneSecSingleParameterMeasurementsComplete)
                .catch(getOneSecSingleParameterMeasurementsFailed);
                
            function getOneSecSingleParameterMeasurementsComplete(response) {
                return response;
            }
            
            function getOneSecSingleParameterMeasurementsFailed(error) {
                console.log(error);
            }
        
        }
        
    }
    
})();
