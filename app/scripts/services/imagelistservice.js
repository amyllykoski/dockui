'use strict';

/**
 * @ngdoc service
 * @name dockuiApp.ImageListService
 * @description
 * # ImageListService
 * Service in the dockuiApp.
 */
angular.module('dockuiApp')
  .factory('ImageListService', function ($http, $location, $log) {
  //  var dockerUrl = 'http://10.25.191.196:2375/images/json';
//var PROXY_URL = 'http://localhost:8007/';
  var PROXY_URL = 'http://' + $location.host() + ':8007/';
  var centosDocker = PROXY_URL + '_10.25.191.196:2375/images/json';
  var dockerUrl = PROXY_URL + '_153.64.104.38:2375/images/json';
  var getTeradataImageList = function() {
      $log.debug('Making AJAX request to', centosDocker);
      return $http.get(centosDocker);
  };

  var getCustomerImageList = function() {
      $log.debug('Making AJAX request to', dockerUrl);
      return $http.get(dockerUrl);
  };

  var getTeradataIP = function() {
    return '10.25.191.196';
  };

  var getCustomerIP = function() {
    return '153.64.10.38';
  };

  return {
      getTeradataImageList : getTeradataImageList,
      getCustomerImageList : getCustomerImageList,
      getTeradataIP : getTeradataIP,
      getCustomerIP : getCustomerIP
  };
});
