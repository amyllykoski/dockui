'use strict';

/**
 * @ngdoc function
 * @name dockuiApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the dockuiApp
 */
angular.module('dockuiApp')
  .controller('MainCtrl', function ($scope, $log, $interval, ImageListService,
    BuildMessageService) {

    $scope.builds = [];
    $scope.teradataImages = [];
    $scope.customerImages = [];
    $scope.isTeamCityBusy = true;
    $scope.isTeradataBusy = true;
    $scope.isCustomerBusy = true;
    $scope.teradataHostIP = ImageListService.getTeradataIP();
    $scope.customerHostIP = ImageListService.getCustomerIP();

    var getBuildMessages = function() {
      BuildMessageService.getBuildMessage()
      .success(function(message){
        BuildMessageService.setLatestBuildMessage(message);
        $log.debug('Got build message', message);
        $scope.builds = message;
      })
      .error(function(error) {
          $log.error('GetImages failed', error);
        $scope.status = 'Unable to get image list: ' + error.message;
      });
    };

    var getTeradataData = function() {
      ImageListService.getTeradataImageList()
      .success(function(images){
        $log.debug('Got images', images);
        $scope.teradataImages = images;
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
        getBuildMessages();
        getTeradataData();
        getCustomerData();
        $scope.isTeradataBusy = false; // Math.random() * 100 > 49;
        $scope.isCustomerBusy = false; // Math.random() * 100 > 49;
        $scope.isTeamCityBusy = BuildMessageService.isBusy();
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
