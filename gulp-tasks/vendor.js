'use strict';

module.exports = function(gulp, plugins, npmPackages, config) {
  return function() {
    var b = plugins.browserify({ debug: !!config.env.debug });

    npmPackages().forEach(function (id) {
      console.info(id);
      console.info(plugins.nodeResolve.sync(id));
      b.require(plugins.nodeResolve.sync(id), { expose: id });
    });

    var stream = b.bundle().pipe(plugins.source(config.env.debug ? 'vendor.js' : 'vendor.min.js'));

    if (!config.env.debug) {
      stream.pipe(plugins.streamify(plugins.uglify()));
    }

    return stream.pipe(gulp.dest(config.path.public + '/dist'));
  };
};