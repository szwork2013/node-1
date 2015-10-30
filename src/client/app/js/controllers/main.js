'use strict';

var toastr = require('toastr');

module.exports = function($scope, socket) {
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