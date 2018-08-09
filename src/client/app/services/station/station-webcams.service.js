(function() {
    'use strict';
    
    angular
        .module('app.services')
        .factory('StationWebcamsFactory', StationWebcamsFactory);
    
    StationWebcamsFactory.$inject = ['$resource', 'EnvironmentConfig'];
    
    function StationWebcamsFactory($resource, EnvironmentConfig) {

        var restApiBaseUrl = EnvironmentConfig.API;
        var customInterceptor = {
            response: function(response) {
                return response;
            }
        };
        
        return {
          getLiveWebcams: getLiveWebcams,
          getHourlyWebcamPhotos: getHourlyWebcamPhotos,
          getHourlyWebcamPhotosOnTimestamp: getHourlyWebcamPhotosOnTimestamp,  
        };
        
        function getLiveWebcams(stationId) {
            var resource = $resource(restApiBaseUrl + '/api/webcam_live_urls_by_station?station_id=:station_id', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId, 
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({station_id: stationId}).$promise
                .then(getLiveWebcamsComplete)
                .catch(getLiveWebcamsFailed);
                
            function getLiveWebcamsComplete(response) {
                return response;
            }
            
            function getLiveWebcamsFailed(error) {
                console.log(error);
            }
        }
        
        function getHourlyWebcamPhotosOnTimestamp(stationId, onTimestamp, orderBy='DESC', limit=0) {
            var resource = $resource(restApiBaseUrl + '/api/hourly_webcam_photos_by_station?station_id=:station_id&on_timestamp=:on_timestamp&order_by=:order_by&limit=:limit', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        on_timestamp: onTimestamp,
                        order_by: orderBy,
                        limit: limit
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({
                    station_id: stationId, 
                    on_timestamp: onTimestamp,
                    order_by: orderBy,
                    limit: limit
                }).$promise
                .then(getWebcamPhotosOnDateComplete)
                .catch(getWebcamPhotosOnDateFailed);
                
            function getWebcamPhotosOnDateComplete(response) {
                return response;
            }
            
            function getWebcamPhotosOnDateFailed(error) {
                console.log(error);
            }
        }
        
        function getHourlyWebcamPhotos(stationId, fromTimestamp, toTimestamp, orderBy='DESC', limit=0) {
            var resource = $resource(restApiBaseUrl + '/api/hourly_webcam_photos_by_station?station_id=:station_id&from_timestamp=:from_timestamp&to_timestamp=:to_timestamp&order_by=:order_by&limit=:limit', {}, {
                query: {
                    method: 'GET', params: {
                        station_id: stationId,
                        from_timestamp: fromTimestamp,
                        to_timestamp: toTimestamp,
                        order_by: orderBy,
                        limit: limit
                    },
                    isArray: true,
                    interceptor: customInterceptor
                }
            });
            
            return resource.query({
                    station_id: stationId, 
                    from_timestamp: fromTimestamp, 
                    to_timestamp: toTimestamp,
                    order_by: orderBy,
                    limit: limit
                }).$promise
                .then(getWebcamPhotosComplete)
                .catch(getWebcamPhotosFailed);
                
            function getWebcamPhotosComplete(response) {
                return response;
            }
            
            function getWebcamPhotosFailed(error) {
                console.log(error);
            }
        }
        
    }

})();
