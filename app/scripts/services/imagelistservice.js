'use strict';

/**
 * @ngdoc service
 * @name dockuiApp.ImageListService
 * @description
 * # ImageListService
 * Service in the dockuiApp.
 */
angular.module('dockuiApp')
  .factory('ImageListService', function ($http) {
    var dockerUrl = 'http://10.25.191.196:2375/images/json';

    var getImageList = function() {
      return $http.get(dockerUrl);
    };

    return {
        getImageList : getImageList
    };
  });
