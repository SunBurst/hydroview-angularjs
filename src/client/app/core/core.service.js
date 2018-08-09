(function() {    
    'use strict';
    
    angular
        .module('app.services')
        .factory('CoreFactory', CoreFactory);
    
    function CoreFactory() {
        
        return {
          arrayContains: arrayContains,  
          stringToDashLowerCase: stringToDashLowerCase
        };
        
        function stringToDashLowerCase(str) {
          return str.replace(/\s+/g, '-').toLowerCase();
        }
      
        function arrayContains(elem, arr) {
          return (arr.indexOf(elem) > -1);
        }
    }
    
})();
