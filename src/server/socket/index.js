'use strict';

var moment = require('moment');

var users = {};

module.exports = function(io, conf) {
  io.on('connection', function(socket) {

    var uuid = guid();
    users[uuid] = socket.uuid = uuid;

    console.log('Client ' + uuid + ' connected');
    socket.emit('server.user.information', socketMsg({ uuid: uuid }));
    socket.emit('server.user.notify', socketMsg('Welcome ' + socket.uuid, 'info'));
    socket.broadcast.emit('server.user.notify', socketMsg('User ' + socket.uuid + ' connected !', 'warning'));
    io.sockets.emit('server.users.number', socketMsg(Object.keys(users).length));

    socket.on('disconnect', function () {
      console.log('Client ' + uuid + ' deconnected');
      delete users[socket.uuid];
      socket.broadcast.emit('server.users.number', socketMsg(Object.keys(users).length));
    });

    require('./chat')(io, socket, socketMsg);

    /*
     * Helpers
     */

    function socketMsg(content, type) {
      return { date: moment().format('YYYY-MM-DD HH:mm:SS'), type: type, user: socket.uuid, message: content };
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