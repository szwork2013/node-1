'use strict';

var User = require('../models/user');
var httpRes = require('./helpers/httpRes');

module.exports.controller = function(app, io, config) {
  app.post('/user', function (req, res) {
    User.findByIdAndUpdate(req.body, function(err, result) {
      if (err) {
        httpRes.sendJSON(res, 404, {}, err);
      } else {
        httpRes.sendJSON(res, 200, { user: result }, err);
      }
    });
  });
};