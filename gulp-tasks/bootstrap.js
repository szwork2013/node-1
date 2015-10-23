'use strict';

module.exports = function(gulp, plugins, npmPackages, config) {
  return function() {
    gulp.src('src/client/less/variables.less')
      .pipe(gulp.dest(config.path.public + '/lib/bootstrap/less'));

    gulp.src(config.path.public + '/lib/bootstrap/less/bootstrap.less')
      .pipe(plugins.less())
      .pipe(gulp.dest(config.path.public + '/lib/bootstrap/dist/css'));
  };
};