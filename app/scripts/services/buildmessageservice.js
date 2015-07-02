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
    var latestBuildMessage = [];

    var getBuildMessages = function() {
      return $http.get(PROXY_URL + '/build');
    };

    var setLatestBuildMessage = function(msg) {
      latestBuildMessage = msg;
    };

    var isBusy = function() {

      if(!latestBuildMessage) {
        return false;
      }

      for(var i in latestBuildMessage) {
        $log.debug("LatestBuildMessage: ", i);
        if( latestBuildMessage[i].status != 'done' &&
          latestBuildMessage[i].status != '-' ) {
            return true;
          }
      }
      return false;
    };

    return {
        getBuildMessage : getBuildMessage,
        setLatestBuildMessage : setLatestBuildMessage,
        isBusy : isBusy
    };
  });
