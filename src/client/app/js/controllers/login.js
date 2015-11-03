'use strict';

module.exports = function($scope, socket) {
  $scope.userLogin = {};

  $scope.login = function(userLogin) {
    $scope.userLogin = require('angular').copy(userLogin);
  }
};