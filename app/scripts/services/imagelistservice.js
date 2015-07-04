'use strict';

/**
 * @ngdoc service
 * @name dockuiApp.ImageListService
 * @description
 * # ImageListService
 * Service in the dockuiApp.
 */
angular.module('dockuiApp')
  .factory('ImageListService', function ($http, $log, $rootScope, AgentConfigService) {
  //  var dockerUrl = 'http://10.25.191.196:2375/images/json';
  var PROXY_URL = 'http://localhost:8007/';
  var agentConfig = null;

  AgentConfigService.getAgentConfig()
    .success(function(config) {
      $log.debug('Agent Config:', config);
      agentConfig = config;
      $rootScope.$broadcast('agentListUpdated');
    })
    .error(function(err) {
      $log.error(err);
    });

  var getTeradataImageList = function() {
    $log.debug('Making AJAX request to', PROXY_URL + '_' + agentConfig[1].ipAddress + ':' + agentConfig[1].port + '/images/json');
    return $http.get(PROXY_URL + '_' + agentConfig[1].ipAddress + ':' + agentConfig[1].port + '/images/json');
  };

  var getCustomerImageList = function() {
      $log.debug('Making AJAX request to', PROXY_URL + '_' + agentConfig[0].ipAddress + ':' + agentConfig[0].port + '/images/json');
      return $http.get(PROXY_URL + '_' + agentConfig[0].ipAddress + ':' + agentConfig[0].port + '/images/json');
  };

  var getTeradataIP = function() {
    return agentConfig[1].ipAddress;
  };

  var getCustomerIP = function() {
    return agentConfig[0].ipAddress;
  };

  return {
      getTeradataImageList : getTeradataImageList,
      getCustomerImageList : getCustomerImageList,
      getTeradataIP : getTeradataIP,
      getCustomerIP : getCustomerIP
  };
});
