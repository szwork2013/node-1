'use strict';

module.exports = function($rootScope, $scope, socket) {
  $scope.messages = [];
  socket.on('server.users.number', function(data) {
    $scope.userNumber = data.message;
  });
  socket.on('client.chat.push.message', function(data) {
    $scope.messages.push(data);
    $rootScope.$broadcast('chat.scroll.bottom', {});
  });
  $scope.sendMessage = function() {
    if ($scope.message != '') {
      socket.emit('server.chat.push.message', $scope.message);
      $scope.message = '';
    }
  }
};