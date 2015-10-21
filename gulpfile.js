'use strict';

var gulp = require('gulp');
var _ = require('lodash');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var nodeResolve = require('resolve');
var minifyCss = require('gulp-minify-css');
var source = require('vinyl-source-stream');
var config = require('./config.json');
var argv = require('yargs');

var production = (argv.env === 'production');

gulp.task('build-vendor', function () {
  var b = browserify({ debug: !production });

  getNPMPackageIds().forEach(function (id) {
    b.require(nodeResolve.sync(id), { expose: id });
  });

  var stream = b.bundle().pipe(source('vendor.js'));

  if (production) {
    stream.pipe(uglify());
  }

  stream.pipe(gulp.dest(config.path.public + '/dist'));

  return stream;
});

gulp.task('build-app', function () {
  var b = browserify(config.path.public + '/app/app.js', { debug: !production });

  getNPMPackageIds().forEach(function (id) {
    b.external(id);
  });

  var stream = b.bundle().pipe(source(config.main));

  if (production) {
    stream.pipe(uglify());
  }

  stream.pipe(gulp.dest(config.path.public + '/dist'));

  return stream;
});

gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({
    script: config.main,
    watch: [config.main]
  })
    .on('start', function onStart() {
      if (!called) { cb(); }
      called = true;
    })
    .on('restart', function onRestart() {
      setTimeout(function reload() {
        browserSync.reload({
          stream: false
        });
      }, config.env.dev.browserSyncReloadDelay);
    });
});

gulp.task('browser-sync', ['nodemon'], function () {
  browserSync({
    proxy: config.env.dev.host + ':' + config.env.dev.port,
    port: config.env.dev.proxyPort,
    browser: ['google-chrome']
  });
});

gulp.task('build-css', function () {
  var stream = gulp.src(config.path.public + '/css/**/*.css');

  if (production) {
    stream.pipe(minifyCss());
  }

  stream.pipe(gulp.dest(config.path.public + '/dist'));

  return stream;
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('default', ['build-vendor', 'build-app', 'build-css', 'browser-sync'], function() {
  gulp.watch(config.path.public + '/css/**/*.css', ['build-css', browserSync.reload({ stream: true })]);
  gulp.watch(config.path.public + '/vendor/**/*.*', ['build-vendor', browserSync.reload({ stream: true })]);
  gulp.watch(config.path.public + '/app/**/*.js', ['build-app', browserSync.reload({ stream: true })]);
  gulp.watch(config.path.public + '/**/*.html', ['bs-reload']);
});

gulp.task('install', ['build-vendor', 'build-app', 'build-css'], function() {});

function getNPMPackageIds() {
  return _.keys(require('./package.json').dependencies) || [];
}
