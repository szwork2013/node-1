'use strict';

var toastr = require('toastr');

module.exports = function($scope, $rootScope, socket) {
  // User information when connected
  socket.on('server.user.information', function(data) {
    $rootScope.user.uuid = data.user;
  });
  // Notifications handler
  socket.on('server.user.notify', function (data) {

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
};