(function() {
    'use strict';
    
    angular
        .module('app.services')
        .factory('stations', stations);
    
    stations.$inject = ['$resource', 'EnvironmentConfig'];
    
    function stations($resource, EnvironmentConfig) {
        
        var restApiBaseUrl = EnvironmentConfig.API;
        var customInterceptor = {
            response: function(response) {
                return response;
            }
        };
        
        return {
            getStations: getStations
        };
        
        function getStations() {
            var resource = $resource(restApiBaseUrl + '/api/stations/:bucket', {}, {
                query: {
                    method: 'GET', params: {bucket: 0}, isArray: true, 
                    interceptor: customInterceptor
                }
            });
            
            return resource.query().$promise
                .then(getStationsComplete)
                .catch(getStationsFailed);
                
            function getStationsComplete(response) {
                return response;
            }
            
            function getStationsFailed(error) {
                console.log(error);
            }
        
        }
        
    }

})();
