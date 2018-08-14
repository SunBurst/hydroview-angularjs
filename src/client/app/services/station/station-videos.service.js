(function() {
  'use strict';

  angular
    .module('app.services')
    .factory('stationVideos', stationVideos);

  stationVideos.$inject = ['$resource', 'EnvironmentConfig'];

  function stationVideos($resource, EnvironmentConfig) {

    var restApiBaseUrl = EnvironmentConfig.API;
    var customInterceptor = {
      response: function(response) {
        return response;
      }
    };

    return {
      getVideoUrls: getVideoUrls
    };
    
    function getVideoUrls(stationId, fromTimestamp, toTimestamp, orderBy='DESC', limit=0) {
      var resource = $resource(restApiBaseUrl + '/api/video_urls_by_station?station_id=:station_id&from_timestamp=:from_timestamp&to_timestamp=:to_timestamp&order_by=:order_by&limit=:limit', {}, {
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
        .then(getVideoUrlsComplete)
        .catch(getVideoUrlsFailed);

      function getVideoUrlsComplete(response) {
        return response;
      }

      function getVideoUrlsFailed(error) {
        console.log(error);
      }
    }

  }
    
})();
