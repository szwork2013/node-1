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
plugins.concatCss = require('gulp-concat-css');
plugins.minifyCss = require('gulp-minify-css');

var tasksMapper = {
  'clean': [],
  'vendor': [],
  'app': [],
  'nodemon': [],
  'browser-sync': ['nodemon'],
  'bs-reload': [],
  'node-copy': [],
  'less-variable': ['node-copy'],
  'less-compile': ['less-variable'],
  'css': ['less-compile'],
};

var browserDependencies = [
  'angular',
  'angular-gravatar',
  'angular-ui-router',
  'angular-ui-sortable',
  'angular-ui-bootstrap',
  'ion-rangeslider',
  'angular-translate',
  'bootstrap-ui',
  'jquery',
  'jquery-ui',
  'jquery-slimscroll',
  'metismenu',
  'oclazyload',
  'pace',
  'sweetalert',
  'toastr',
  'moment',
  'ng-focus-if',
];

config.env.current = process.env.NODE_ENV || argv.env;
config.env.debug = (config.env.current !== 'production');

// Bind tasks
Object.keys(tasksMapper).forEach(function(task) {
  gulp.task(task, this[task] || [], getTask(task));
}, tasksMapper);

// Build tasks
gulp.task('javascript', ['vendor', 'app']);
gulp.task('install', ['javascript', 'css'], getTask('clean'));
gulp.task('default', ['browser-sync'], getTask('watch'));

function getTask(task) {
  return require('./gulp-tasks/' + task)(gulp, plugins, function() {
    var dependenciesObj = require('./package.json').dependencies;

    return Object.keys(dependenciesObj).filter(function(element) {
      return browserDependencies.indexOf(element) != -1;
    });
  }, config);
}
