'use strict';

/**
 * @ngdoc function
 * @name dockuiApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the dockuiApp
 */
angular.module('dockuiApp')
  .controller('AboutCtrl', function ($scope, ImageListService) {
    $scope.images = {};

    $scope.images = ImageListService.getImageList()
    .success(function(images){
      $scope.images = images;
    })
    .error(function(error) {
      $scope.status = 'Unable to get image list: ' + error.message;
    });

  });
