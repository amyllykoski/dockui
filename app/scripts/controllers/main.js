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
    $scope.teradataRegistry = {};
    $scope.isTeamCityBusy = true;
    $scope.isTeradataBusy = true;
    $scope.isCustomerBusy = true;
    $scope.teradataHostIP = ImageListService.getTeradataIP();
    $scope.customerHostIP = ImageListService.getCustomerIP();

    var getBuildMessages = function() {
      BuildMessageService.getBuildMessages()
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

    var getTeradataRegistryData = function () {
      ImageListService.getTeradataRegistryList()
      .success(function(images){
        $log.debug('Got registry images', images);
        $scope.teradataRegistry = images;
      })
      .error(function(error) {
          $log.error('GetImages failed', error);
        $scope.status = 'Unable to get registry image list: ' + error.message;
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

    var stopUpdates,
        stopSpinnerUpdates;
    var tick = function() {
      if (angular.isDefined(stopUpdates) ) {
        return;
      }

      stopUpdates = $interval(function() {
        getBuildMessages();
        getTeradataData();
        getCustomerData();
        getTeradataRegistryData();
      }, 8000);
    };

    var tack = function() {
      if (angular.isDefined(stopSpinnerUpdates) ) {
        return;
      }

      stopSpinnerUpdates = $interval(function() {
        $scope.isTeradataBusy = false; // Math.random() * 100 > 49;
        $scope.isCustomerBusy = false; // Math.random() * 100 > 49;
        $scope.isTeamCityBusy = BuildMessageService.isBusy();
      }, 2000);
    };

    $scope.stopTick = function() {
      if (angular.isDefined(stopUpdates)) {
        $interval.cancel(stopUpdates);
        stopUpdates = undefined;
      }
    };

    $scope.stopTack = function() {
      if (angular.isDefined(stopSpinnerUpdates)) {
        $interval.cancel(stopSpinnerUpdates);
        stopSpinnerUpdates = undefined;
      }
    };

    $scope.$on('$destroy', function() {
      $scope.stopTick();
      $scope.stopTack();
    });

    tick();
    tack();
  });
