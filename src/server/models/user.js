'use strict';

var mongoose = require('mongoose');

module.exports = (function() {
  var schema = new mongoose.Schema({
    id: String,
    user_id: String,
    userName: String,
    name: {
      firstName: String,
      lastName: String
    },
    job: String,
  });

  schema.statics.findOrCreate = function (profile, cb) {
    var model = this;

    model.find({user_id: profile.user_id}).exec(function (err, results) {
      if (results.length === 0) {
        model.create(profile, cb);
      } else {
        cb(err, results[0]);
      }
    });
  };

  return mongoose.model('User', schema);
})();