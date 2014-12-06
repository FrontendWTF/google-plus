angular.module('google.plus', [
]).provider('GooglePlus', function (
) {
  var lang = 'en-US';

  var provider = {
    lang: function (language) {
      if (language) {
        lang = language;

        return provider;
      } else {
        return lang;
      }
    },
    $get: function (
      $q,
      $window,
      $rootScope
    ) {
      var deferred = $q.defer();
      var reference = 'onGoogleAuthApiLoaded';

      $window[reference] = function () {
        deferred.resolve($window.gapi);
      };

      (function (document, script, scriptElement, firstScript) {
        scriptElement = document.createElement(script);
        scriptElement.src = 'https://apis.google.com/js/client:plusone.js' +
          '?onload=' + reference;
        scriptElement.lang = lang,
        scriptElement.async = true;
        firstScript = document.getElementsByTagName('script')[0];
        firstScript.parentNode.insertBefore(scriptElement, firstScript);
      }(document, 'script'));

      return {
        promise: deferred.promise
      };
    }
  };

  return provider;
});
