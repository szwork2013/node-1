'use strict';

var users = {};

module.exports = function(io, conf) {
  io.on('connection', function(socket) {

    var uuid = guid();
    users[uuid] = socket.uuid = uuid;

    console.log('Client ' + uuid + ' connected');
    socket.emit('server.user.notify', socketMsg('Welcome ' + socket.uuid, 'info'));
    socket.broadcast.emit('server.user.notify', socketMsg('User ' + socket.uuid + ' connected !', 'warning'));

    socket.on('disconnect', function () {
      console.log('Client ' + uuid + ' deconnected');
      delete users[socket.username];
    });

    /*
     * Helpers
     */

    function socketMsg(content, type) {
      return { date: (new Date()).toString(), type: type, user: socket.uuid, message: content };
    }

    function guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    }
  });
};