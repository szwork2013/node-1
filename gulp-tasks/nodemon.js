'use strict';

module.exports = function(gulp, plugins, npmPackages, config) {
  return function(cb) {
    var called = false;
    return plugins.nodemon({
      script: config.main,
      watch: [config.main],
      env: { 'NODE_ENV': config.env.current }
    })
      .on('start', function onStart() {
        if (!called) { cb(); }
        called = true;
      })
      .on('restart', function onRestart() {
        setTimeout(function reload() {
          plugins.browserSync.reload({
            stream: false
          });
        }, config.env.dev.browserSyncReloadDelay);
      });
  };
};