'use strict';

/**
 * @ngdoc service
 * @name dockuiApp.AgentConfigService
 * @description
 * # AgentConfigService
 * Service in the dockuiApp.
 */
angular.module('dockuiApp')
  .service('AgentConfigService', function ($http, $log) {
    var PROXY_URL = 'http://localhost:8007';

    var getAgentConfig = function() {
      $log.debug('Getting agent configuration from ' + PROXY_URL + '/agents');
      return $http.get(PROXY_URL + '/agents');
    };

    return {
      getAgentConfig : getAgentConfig
    };
  });
