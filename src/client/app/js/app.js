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
  .run(function(auth, $rootScope, $state, store, jwtHelper, $location) {
    auth.hookEvents();
    $rootScope.$state = $state;
    // Fixture
    $rootScope.user = {
      uuid: '',
      firstName: 'Tyler',
      lastName: 'Durden',
      email: 'gabrielmalet@gmail.com',
      job: 'Founder of Chaos Project',
    };

    $rootScope.$on('$locationChangeStart', function() {
      var token = store.get('token');
      if (token) {
        if (!jwtHelper.isTokenExpired(token)) {
          if (!auth.isAuthenticated) {
            auth.authenticate(store.get('profile'), token);
          }
        } else {
          $location.path('/');
        }
      }
    });
  })
;