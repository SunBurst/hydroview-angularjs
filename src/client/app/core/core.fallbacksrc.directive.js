(function(){

    angular.module('app.core')
    .directive('fallbackSrc', fallbackSrc);
    
    function fallbackSrc() {
        var directive = {
            link: function postLink(scope, iElement, iAttrs) {
                iElement.bind('error', function() {
                    angular.element(this).attr('src', iAttrs.fallbackSrc);
                });
            }
        };
        return directive;
    }
    
})();
