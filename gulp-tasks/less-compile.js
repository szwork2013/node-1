'use strict';

module.exports = function(gulp, plugins, npmPackages, config) {
  return function() {
    // Font Awesome
    gulp.src(config.path.public + '/lib/font-awesome/less/font-awesome.less')
      .pipe(plugins.less())
      .pipe(gulp.dest(config.path.public + '/lib/font-awesome/dist/css'));

    // Bootstrap
    return gulp.src(config.path.public + '/lib/bootstrap/less/bootstrap.less')
      .pipe(plugins.less())
      .pipe(gulp.dest(config.path.public + '/lib/bootstrap/dist/css'));
  };
};