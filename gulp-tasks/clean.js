'use strict';

module.exports = function(gulp, plugins, npmPackages, config) {
  return function() {
    plugins.del(['public/lib']);
  };
};