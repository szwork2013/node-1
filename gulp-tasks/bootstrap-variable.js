'use strict';

module.exports = function(gulp, plugins, npmPackages, config) {
  return function() {

    return gulp.src('src/client/app/less/bootstrap/variables.less')
      .pipe(gulp.dest(config.path.public + '/lib/bootstrap/less'));
  };
};