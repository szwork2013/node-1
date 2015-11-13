'use strict';

// Global
window.$ = window.jQuery = require('jquery');

// External
require('angular');
require('angular-gravatar');
require('angular-ui-router');
require('angular-translate');
require('angular-ui-bootstrap');
require('auth0-angular');
require('angular-storage');
require('angular-cookies');
require('angular-jwt');
require('ng-focus-if');
require('pace').start();

// Internal
require('./controllers');
require('./directives');
require('./modules');

var app = angular.module('corpnet', [
  'ui.router',
  'ui.bootstrap',
  'ui.gravatar',
  'corpnet.controllers',
  'corpnet.directives',
  'corpnet.socket-io',
  'pascalprecht.translate',
  'focus-if',
  'auth0',
  'angular-storage',
  'angular-jwt'
]);

app.config(require('./config'))
  .factory('socket', function (socketFactory) {
    return socketFactory({
      prefix: '',
      ioSocket: io(),
    });
  })
  .run(function(auth, $rootScope, $state, store, jwtHelper, $location, socket) {
    auth.hookEvents();
    $rootScope.$state = $state;
    $rootScope.user = {};

    $rootScope.$on('$locationChangeStart', function() {
      var token = store.get('token');
      if (token) {
        if (!jwtHelper.isTokenExpired(token)) {
          var profile = store.get('profile');
          if (!auth.isAuthenticated) {
            auth.authenticate(profile, token);
            socket.emit('server.user.connected', profile);
          }
          if ($location.path() == '/login') {
            $location.path('/');
          }
        } else {
          store.remove('token');
          store.remove('profile');
          $location.path('/');
        }
      }
    });
  })
;