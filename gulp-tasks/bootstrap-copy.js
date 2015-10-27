'use strict';

module.exports = function(gulp, plugins, npmPackages, config) {
  return function() {
    var bootstrapNodePath = 'node_modules/bootstrap/';

    return gulp.src([
        bootstrapNodePath + 'less/!(variables).less',
        bootstrapNodePath + 'less/mixins/*.less',
        bootstrapNodePath + 'dist/fonts/*.*'],
      { base: bootstrapNodePath }
    ).pipe(gulp.dest(config.path.public + '/lib/bootstrap'));
  };
};