'use strict';

module.exports = function(gulp, plugins, npmPackages, config) {
  return function() {

    return gulp.src(plugins.mainBowerFiles(), { base: 'bower_components' })
      .pipe(gulp.dest(config.path.public + '/lib'));
  };
};