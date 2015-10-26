'use strict';

var gulp = require('gulp');
var config = require('./config.json');
var argv = require('yargs').argv;

var plugins = {};
plugins.browserSync = require('browser-sync');
plugins.nodemon = require('gulp-nodemon');
plugins.uglify = require('gulp-uglify');
plugins.browserify = require('browserify');
plugins.nodeResolve = require('resolve');
plugins.source = require('vinyl-source-stream');
plugins.streamify = require('gulp-streamify');
plugins.del = require('del');
plugins.mainBowerFiles = require('main-bower-files');
plugins.less = require('gulp-less');


config.env.current = process.env.NODE_ENV || argv.env;
config.env.debug = (config.env.current === 'production');

// Bind tasks
gulp.task('clean', getTask('clean'));
gulp.task('build-vendor', getTask('vendor'));
gulp.task('build-app', getTask('app'));
gulp.task('nodemon', getTask('nodemon'));
gulp.task('browser-sync', ['nodemon'], getTask('browser-sync'));
gulp.task('bs-reload', getTask('bs-reload'));
gulp.task('bower', getTask('bower'));
gulp.task('bootstrap', getTask('bootstrap'));

//
gulp.task('javascript', ['build-vendor', 'build-app']);
gulp.task('style', ['bower', 'bootstrap']);
gulp.task('install', ['javascript', 'style']);
gulp.task('default', ['install'], getTask('watch'));


function getNPMPackageIds() {
  var dependencies = require('./package.json').dependencies;

  return typeof dependencies == "undefined" ? [] : Object.keys(dependencies);
}

function getTask(task) {
  return require('./gulp-tasks/' + task)(gulp, plugins, getNPMPackageIds, config);
}
