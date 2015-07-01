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
  var PROXY_URL = 'http://localhost:8007/';
  var dockerUrl = PROXY_URL + '_10.25.191.196:2375/images/json';
  var boot2docker = PROXY_URL + '_192.168.59.103:2376/images/json'
  var getTeradataImageList = function() {
      $log.debug('Making AJAX request to', dockerUrl);
      return $http.get(boot2docker);
  };

  var getCustomerImageList = function() {
      $log.debug('Making AJAX request to', dockerUrl);
      return $http.get(dockerUrl);
  };

  return {
      getTeradataImageList : getTeradataImageList,
      getCustomerImageList : getCustomerImageList,
  };
});
