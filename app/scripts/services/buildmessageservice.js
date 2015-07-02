'use strict';

/**
 * @ngdoc service
 * @name dockuiApp.BuildMessageService
 * @description
 * # BuildMessageService
 * Service in the dockuiApp.
 */
angular.module('dockuiApp')
  .service('BuildMessageService', function ($http, $location, $log) {
    var PROXY_URL = 'http://' + $location.host() + ':8007';
    var latestBuildMessage = [];

    var getBuildMessages = function() {
      $log.debug('Getting build messages from ' + PROXY_URL + '/build');
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
        if( latestBuildMessage[i].status !== 'done' &&
          latestBuildMessage[i].status !== '-' ) {
            return true;
          }
      }
      return false;
    };

    return {
        getBuildMessages : getBuildMessages,
        setLatestBuildMessage : setLatestBuildMessage,
        isBusy : isBusy
    };
  });
