'use strict';

module.exports = function(gulp, plugins, npmPackages, config) {
  return function() {
    return gulp.src([config.path.public + '/lib/**/*.css', 'src/client/css/**/*.css'])
      .pipe(plugins.concatCss('app.css'))
      .pipe(gulp.dest(config.path.public + '/dist'));
  };
};