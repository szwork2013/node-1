'use strict';

var gulp = require('gulp');
var _ = require('lodash');
var config = require('./config.json');
var argv = require('yargs').argv;

var plugins = {};
plugins.browserSync = require('browser-sync');
plugins.nodemon = require('gulp-nodemon');
plugins.uglify = require('gulp-uglify');
plugins.gutil = require('gulp-util');
plugins.browserify = require('browserify');
plugins.nodeResolve = require('resolve');
plugins.minifyCss = require('gulp-minify-css');
plugins.source = require('vinyl-source-stream');
plugins.streamify = require('gulp-streamify');


config.env.current = process.env.NODE_ENV || argv.env;
config.env.debug = (config.env.current === 'production');

// Bind tasks
gulp.task('build-vendor', getTask('vendor'));
gulp.task('build-app', getTask('app'));
gulp.task('nodemon', getTask('nodemon'));
gulp.task('browser-sync', ['nodemon'], getTask('browser-sync'));
gulp.task('bs-reload', getTask('bs-reload'));

//
gulp.task('install', ['build-vendor', 'build-app']);
gulp.task('default', ['build-vendor', 'build-app', 'browser-sync'], getTask('watch'));


function getNPMPackageIds() {
  return _.keys(require('./package.json').dependencies) || [];
}

function getTask(task) {
  return require('./gulp-tasks/' + task)(gulp, plugins, getNPMPackageIds, config);
}
