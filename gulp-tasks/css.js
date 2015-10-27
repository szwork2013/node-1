'use strict';

module.exports = function(gulp, plugins, npmPackages, config) {
  return function() {
    var stream = gulp.src([config.path.public + '/lib/**/*.css', 'src/client/app/css/**/*.css'])
      .pipe(plugins.concatCss(config.env.debug ? 'app.css' : 'app.min.css'));

    if (!config.env.debug) {
      stream
        .pipe(plugins.minifyCss());
    }

    return stream.pipe(gulp.dest(config.path.public + '/dist'));
  };
};