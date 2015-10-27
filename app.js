'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var config = require('./config.json');
var argv = require('yargs').argv;
var fs = require('fs');
var mongoose = require('mongoose');

var server = http.createServer(app);

// default
var env = process.env.NODE_ENV || argv.env;
var port = 3000, host = config.env.host || 'localhost';

app.use(bodyParser.json());
app.use(express.static(config.path.public));

// Add routes from controller file
fs.readdirSync(config.path.server.controller).forEach(function (file) {
  if(file.substr(-3) == '.js') {
    var route = require(config.path.server.controller + '/' + file);
    route.controller(app, config);
  }
});

server.listen(port, host);
server.on('listening', function() {
  console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});