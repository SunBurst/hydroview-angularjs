(function() {    
    'use strict';
    
    angular
        .module('app.services')
        .factory('SensorsFactory', SensorsFactory);
    
    SensorsFactory.$inject = ['$resource', 'EnvironmentConfig'];
    
    function SensorsFactory($resource, EnvironmentConfig) {

      var restApiBaseUrl = EnvironmentConfig.API;  
      var customInterceptor = {
          response: function(response) {
              return response;
          }
      };
        
        return {
          getMeasurementFrequenciesBySensorParameter: getMeasurementFrequenciesBySensorParameter,  
          getSensorParameters: getSensorParameters,
        };
        
        function getSensorParameters(sensorId) {
            var resource = $resource('/api/parameters_by_sensor/:sensor_id', {}, {
                query: {
                    method: 'GET', params: {
                        sensor_id: sensorId
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({sensor_id: sensorId}).$promise
                .then(getSensorParametersComplete)
                .catch(getSensorParametersFailed);
                
            function getSensorParametersComplete(response) {
                return response;
            }
            
            function getSensorParametersFailed(error) {
                console.log(error);
            }
        }
      
      function getMeasurementFrequenciesBySensorParameter(sensorId, parameterId, parameterType) {
            
          var resource = $resource(restApiBaseUrl + '/api/measurement_frequencies_by_sensor_parameter?sensor_id=:sensor_id&parameter_id=:parameter_id&parameter_type=:parameter_type', {}, {
            query: {
              method: 'GET', params: {
                sensor_id: sensorId,
                parameter_id: parameterId,
                parameter_type: parameterType
              },
              isArray: true,
              interceptor: customInterceptor
            }
          });
          
          return resource.query({
            sensor_id: sensorId,
            parameter_id: parameterId,
            parameter_type: parameterType
          }).$promise
            .then(getMeasurementFrequenciesBySensorParameterComplete)
            .catch(getMeasurementFrequenciesBySensorParameterFailed);
                
            function getMeasurementFrequenciesBySensorParameterComplete(response) {
              return response;
            }
            
            function getMeasurementFrequenciesBySensorParameterFailed(error) {
                console.log(error);
            }
        
        }
        
    }
    
})();
