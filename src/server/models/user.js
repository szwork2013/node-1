'use strict';

var mongoose = require('mongoose');

module.exports = (function() {
  var schema = new mongoose.Schema({
    id: String,
    identity: {
      user_id: String,
    },
    name: {
      userName: String,
      firstName: String,
      lastName: String
    },
    info: {
      job: String,
      email: String,
      description: String,
    },
  });

  schema.statics.findOrCreate = function (profile, cb) {
    var model = this;

    model.find({"identity.user_id": profile.user_id}).exec(function (err, results) {
      if (results.length === 0) {
        model.create({
          "identity.user_id": profile.user_id,
          "name.userName": profile.nickname,
          "info.email": profile.email,
        }, cb);
      } else {
        cb(err, results[0]);
      }
    });
  };

  return mongoose.model('User', schema);
})();