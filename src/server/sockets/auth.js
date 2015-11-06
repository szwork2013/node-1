'use strict';

var users = {};
var guests = {};

module.exports = function(io, socket, socketMsg) {
  var uuid = guid();
  guests[uuid] = socket.uuid = uuid;
  console.log('Guest ' + socket.uuid + ' connected !');

  socket.on('server.user.connected', function(data) {
    users[data.user_id] = socket.auth = data;
    console.log('User ' + socket.auth.user_id + ' (' + socket.auth.nickname + ') connected !');
    // todo: bind database to get more information about clients
    socket.emit('client.user.information', socketMsg({ uuid: socket.uuid }));
    socket.emit('client.user.notify', socketMsg('Welcome ' + socket.auth.nickname, 'info'));
    socket.broadcast.emit('client.user.notify', socketMsg('User ' + socket.auth.nickname + ' connected !', 'warning'));
    io.sockets.emit('client.users.number', socketMsg(Object.keys(users).length));
  });

  socket.on('server.user.disconnected', function() {
    console.log('User ' + socket.auth.user_id + ' (' + socket.auth.nickname + ') disconnected !');
    delete users[socket.user_id];
    socket.broadcast.emit('client.users.number', socketMsg(Object.keys(users).length));
  });

  socket.on('disconnect', function () {
    console.log('Guest ' + socket.uuid + ' disconnected !');
    delete guests[socket.uuid];
  });

  /*
   * Heleprs
   */

  function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }
};

module.exports.users = users;
module.exports.guests = guests;