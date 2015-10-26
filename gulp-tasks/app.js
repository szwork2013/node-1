'use strict';

module.exports = function(gulp, plugins, npmPackages, config) {
  return function() {
    var b = plugins.browserify('./src/client/app/app.js', { debug: config.env.debug });

    npmPackages().forEach(function (id) { b.external(id); });

    var stream = b.bundle().pipe(plugins.source(config.env.debug ? 'app.js' : 'app.min.js'));

    if (!config.env.debug) {
      stream.pipe(plugins.streamify(plugins.uglify()));
    }

    return stream.pipe(gulp.dest(config.path.public + '/dist'));
  };
};