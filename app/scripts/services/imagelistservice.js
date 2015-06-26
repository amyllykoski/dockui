'use strict';

/**
 * @ngdoc service
 * @name dockuiApp.ImageListService
 * @description
 * # ImageListService
 * Service in the dockuiApp.
 */
angular.module('dockuiApp')
  .factory('ImageListService', function ($http, $log) {
  //  var dockerUrl = 'http://10.25.191.196:2375/images/json';
  var dockerUrl = 'http://localhost:8005';
  var getImageList = function() {
      $log.debug("Making AJAX request to", dockerUrl);
      return $http.get(dockerUrl);
  };

    return {
        getImageList : getImageList
    };
  });
