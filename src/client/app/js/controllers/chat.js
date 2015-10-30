'use strict';

module.exports = function($scope, socket) {
  socket.on('server.users.number', function(data) {
    $scope.userNumber = data.message;
  });
};