'use strict';

module.exports = function(gulp, plugins, npmPackages, config) {
  return function() {
    var b = plugins.browserify(config.path.public + '/src/app/app.js', { debug: !config.production });

    npmPackages().forEach(function (id) { b.external(id); });

    var stream = b.bundle().pipe(plugins.source('app.js'));

    if (config.production) {
      stream.pipe(plugins.streamify(plugins.uglify()));
    }

    return stream.pipe(gulp.dest(config.path.public + '/dist'));
  };
};