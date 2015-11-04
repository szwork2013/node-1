'use strict';

var toastr = require('toastr');

module.exports = ['$scope', '$rootScope', 'socket',
  function($scope, $rootScope, socket) {

    socket.on('client.user.information', function(data) {
      $rootScope.user.uuid = data.guest;
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