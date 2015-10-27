module.exports.controller = function(app, config) {
  'use strict';
  
  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, config.path.public + '/index.html'));
  });

  app.get('/test', function(req, res) {
    res.json({test: "test 1"});
  });
};