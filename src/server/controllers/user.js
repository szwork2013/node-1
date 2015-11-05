'use strict';

var User = require('../models/user');

module.exports.controller = function(app, config) {
  app.post('/user', function (req, res) {
    var user = req.body.user;

    if (user) {
      User.findOrCreate(user, function(err, result) {
        if (err) {
          console.error("Error");
        } else {
          console.info(result);
        }
      });
    }
  });
};