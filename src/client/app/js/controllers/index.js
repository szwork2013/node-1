'use strict';

var app = require('angular').module('corpnet.controllers', ['corpnet.socket-io']);

app.controller('main.controller', require('./main'));
app.controller('home.controller', require('./home'));
app.controller('translate.controller', require('./translate'));
app.controller('chat.controller', require('./chat'));
