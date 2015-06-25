'use strict';

/**
 * @ngdoc function
 * @name dockuiApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the dockuiApp
 */
angular.module('dockuiApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
