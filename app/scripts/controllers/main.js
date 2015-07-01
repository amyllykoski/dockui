'use strict';

/**
 * @ngdoc function
 * @name dockuiApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the dockuiApp
 */
angular.module('dockuiApp')
  .controller('MainCtrl', function ($scope, $log, $interval, ImageListService) {

    $scope.builds = [];
    $scope.teradataImages = [];
    $scope.customerImages = [];
    $scope.isTeamCityBusy = true;
    $scope.isTeradataBusy = true;
    $scope.isCustomerBusy = true;
    $scope.teradataHostIP = ImageListService.getTeradataIP();
    $scope.customerHostIP = ImageListService.getCustomerIP();

    $log.debug('Getting images...');
    var getTeradataData = function() {
      ImageListService.getTeradataImageList()
      .success(function(images){
        $log.debug('Got images', images);
        $scope.teradataImages = images;
        $scope.builds = images;
      })
      .error(function(error) {
          $log.error('GetImages failed', error);
        $scope.status = 'Unable to get image list: ' + error.message;
      });
    };

    var getCustomerData = function() {
      ImageListService.getCustomerImageList()
      .success(function(images){
        $log.debug('Got images', images);
        $scope.customerImages = images;
      })
      .error(function(error) {
          $log.error('GetImages failed', error);
        $scope.status = 'Unable to get image list: ' + error.message;
      });
    };

    var stop;
    var tick = function() {
      if (angular.isDefined(stop) ) {
        return;
      }

      stop = $interval(function() {
        // TODO: Add proxy query
        $scope.isTeamCityBusy = Math.random() * 100 > 49;
        $scope.isTeradataBusy = Math.random() * 100 > 49;
        $scope.isCustomerBusy = Math.random() * 100 > 49;
        getTeradataData();
        getCustomerData();
      }, 10000);
    };

    $scope.stopTick = function() {
      if (angular.isDefined(stop)) {
        $interval.cancel(stop);
        stop = undefined;
      }
    };

    $scope.$on('$destroy', function() {
      $scope.stopTick();
    });

    tick();
  });
