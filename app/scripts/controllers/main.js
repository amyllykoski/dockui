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

    $scope.images = [];
    $scope.isTeamCityBusy = true;
    $scope.isTeradataBusy = false;
    $scope.isCustomerBusy = true;

    $log.debug('Getting images...');
    $scope.images = ImageListService.getImageList()
    .success(function(images){
      $log.debug('Got images', images);
      $scope.images = images;
    })
    .error(function(error) {
        $log.error('GetImages failed', error);
      $scope.status = 'Unable to get image list: ' + error.message;
    });

    var stop;
    var tick = function() {
      if (angular.isDefined(stop) ) {
        return;
      }

      stop = $interval(function() {
        // TODO: Add proxy query
        $scope.isTeamCityBusy = !$scope.isTeamCityBusy;
        $scope.isTeradataBusy = !$scope.isTeradataBusy;
        $scope.isCustomerBusy = !$scope.isCustomerBusy;
      }, 5000);
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
