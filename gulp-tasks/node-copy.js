'use strict';

module.exports = function(gulp, plugins, npmPackages, config) {
  return function() {
    var nodePath = 'node_modules/';

    return gulp.src([
        // nodePath
        nodePath + '/bootstrap/less/!(variables).less',
        nodePath + '/bootstrap/less/mixins/*.less',
        // Font-Awesome
        nodePath + '/font-awesome/css/font-awesome.css',
        nodePath + '/font-awesome/fonts/*.*',
        // Animate
        nodePath + '/animate.css/animate.css',
      ],
      { base: nodePath }
    ).pipe(gulp.dest(config.path.public + '/lib'));
  };
};