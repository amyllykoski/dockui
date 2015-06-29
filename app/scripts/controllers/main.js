'use strict';

/**
 * @ngdoc function
 * @name dockuiApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the dockuiApp
 */
angular.module('dockuiApp')
  .controller('MainCtrl', function ($scope, $log, ImageListService) {
    $scope.images = [];

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

  });
