'use strict';

/**
 * @ngdoc service
 * @name dockuiApp.BuildMessageService
 * @description
 * # BuildMessageService
 * Service in the dockuiApp.
 */
angular.module('dockuiApp')
  .service('BuildMessageService', function ($http, $log) {
    var PROXY_URL = 'http://localhost:8007';
    var latestBuildMessage = {};

    var getBuildMessage = function() {
      return $http.get(PROXY_URL + '/build');
    };

    var setLatestBuildMessage = function(msg) {
      latestBuildMessage = msg;
    };

    var isBusy = function() {
      $log.debug('latestBuildMessage status', latestBuildMessage.status);
      if(!latestBuildMessage.status) {
        return false;
      }

      if( latestBuildMessage.status === 'done' ||
        latestBuildMessage.status === '-' ) {
          return false;
        } else {
          return true;
        }
    };

    return {
        getBuildMessage : getBuildMessage,
        setLatestBuildMessage : setLatestBuildMessage,
        isBusy : isBusy
    };
  });
