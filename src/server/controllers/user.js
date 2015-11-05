'use strict';

var User = require('../models/user');
var helper = require('./helpers/httpRes');

module.exports.controller = function(app, config) {
  app.post('/user', function (req, res) {
    var user = req.body.user;

    if (user) {
      User.findOrCreate(user, function(err, result) {
        if (err) {
          helper.sendJSON(res, 404, {}, err);
        } else {
          helper.sendJSON(res, 200, { message: result });
        }
      });
    } else {
      helper.sendJSON(res, 404, {});
    }
  });
};