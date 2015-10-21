'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
var config = require('./config.json');
var argv = require('yargs').argv;
var server = http.createServer(app);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, config.path.public + '/index.html'));
});

// default
var env = process.env.NODE_ENV || argv.env;
var port = 3000, host = config.env.host || 'localhost';
switch (env) {
  case 'production':
    port = config.env.prod.port || port;
    break;
  case 'staging':
    port = config.env.stage.port || port;
    break;
  case 'dev':
    port = config.env.dev.port || port;
    break;
}

app.use(express.static(config.path.public));

server.listen(port, host);
server.on('listening', function() {
  console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});