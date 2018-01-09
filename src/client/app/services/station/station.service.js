(function() {
    'use strict';
    
    angular
        .module('app.services')
        .factory('StationFactory', StationFactory);
    
    StationFactory.$inject = ['$resource', 'EnvironmentConfig'];
    
    function StationFactory($resource, EnvironmentConfig) {

        var restApiBaseUrl = EnvironmentConfig.API;
        var customInterceptor = {
            response: function(response) {
                return response;
            }
        };
        
        return {
            getStation: getStation
        };
        
        function getStation(stationId) {
            var resource = $resource(restApiBaseUrl + '/api/station/:station_id', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId, 
                    },
                    isArray: false,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({station_id: stationId}).$promise
                .then(getStationComplete)
                .catch(getStationFailed);
                
            function getStationComplete(response) {
                return response;
            }
            
            function getStationFailed(error) {
                console.log(error);
            }
        }
        
    }

})();
