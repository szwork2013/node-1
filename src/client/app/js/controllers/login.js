'use strict';

var toastr = require('toastr');

module.exports = function ($scope, $http, auth, store, $location) {
  $scope.login = function () {
    auth.signin({}, function (profile, token) {
      // Success callback
      store.set('profile', profile);
      store.set('token', token);
      $location.path('/');
    }, function(error) {
      console.log("There was an error logging in", error);
    });
  }
};