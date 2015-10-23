'use strict';

module.exports = function(gulp, plugins, npmPackages, config) {
  return function() {
    plugins.browserSync({
      proxy: config.env.dev.host + ':' + config.env.dev.port,
      port: config.env.dev.proxyPort,
      browser: ['google-chrome']
    });
  };
};