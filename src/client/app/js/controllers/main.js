'use strict';

var toastr = require('toastr');

module.exports = ['$scope', '$http', '$rootScope', 'socket',
  function($scope, $http, $rootScope, socket) {

    socket.on('client.user.information', function(data) {
      $rootScope.user.uuid = data.guest;
      $http({
        method: 'POST',
        url: '/user',
        data: {user: $rootScope.user }
      }).then(function(res) {
        $rootScope.user = Object.assign($rootScope.user, res.data.message);
      }, function() {
        toastr.error(data.error);
      });
    });

    socket.on('client.user.notify', function (data) {
      switch (data.type) {
        case 'info':
          toastr.info(data.message);
          break;
        case 'warning':
          toastr.warning(data.message);
          break;
        case 'error':
          toastr.error(data.message);
          break;
      }
    });
  }
];