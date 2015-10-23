'use strict';

module.exports = function(gulp, plugins, npmPackages, config) {
  return function() {
    var b = plugins.browserify({ debug: !config.production });

    npmPackages().forEach(function (id) {
      b.require(plugins.nodeResolve.sync(id), { expose: id });
    });

    var stream = b.bundle().pipe(plugins.source('vendor.js'));

    if (config.production) {
      stream.pipe(plugins.streamify(plugins.uglify()));
    }

    return stream.pipe(gulp.dest(config.path.public + '/dist'));
  };
};