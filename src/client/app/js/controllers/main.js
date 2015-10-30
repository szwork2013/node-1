'use strict';

module.exports = function($scope, socket) {
  socket.on('server.user.notify', function (data) {
    console.log(data);
  });
};