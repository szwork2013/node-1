'use strict';

var toastr = require('toastr');

module.exports = function($scope, $translate) {
  $scope.userLogin = {};

  $scope.loginSubmit = function(userLogin) {
    if ($scope.loginForm.$valid) {
      $scope.userLogin = require('angular').copy(userLogin);
      console.log($scope.userLogin);
    } else {
      $translate('login.error').then(function(loginError) {
        toastr.error(loginError);
      });
    }
  }
};