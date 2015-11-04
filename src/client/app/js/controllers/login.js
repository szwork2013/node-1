'use strict';

var toastr = require('toastr');

module.exports = ['$scope', '$http', 'auth', 'socket', 'store', '$location',
  function ($scope, $http, auth, socket, store, $location) {
    $scope.login = function () {
      auth.signin({}, function (profile, token) {
        store.set('profile', profile);
        store.set('token', token);
        $location.path('/');
        socket.emit('server.user.connected', profile);
      }, function(error) {
        console.log("There was an error logging in", error);
      });
    };

    $scope.logout = function() {
      auth.signout();
      store.remove('profile');
      store.remove('token');
      socket.emit('server.user.disconnected', {});
    }
  }
];