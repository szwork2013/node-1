'use strict';

// Global
window.$ = window.jQuery = require('jquery');

// External
require('angular');
require('angular-gravatar');
require('angular-ui-router');
require('angular-translate');
require('angular-ui-bootstrap');
require('pace').start();

// Internal
require('./controllers');
require('./directives');
require('./modules');

var app = angular.module('feedme', [
  'ui.router',
  'ui.bootstrap',
  'ui.gravatar',
  'feedme.controllers',
  'feedme.directives',
  'feedme.socket-io',
  'pascalprecht.translate',
]);

app.config(require('./config'))
  .factory('socket', function (socketFactory) {
    return socketFactory({
      prefix: '',
      ioSocket: io(),
    });
  })
  .run(function($rootScope, $state) {
    $rootScope.$state = $state;
    // Fixture
    $rootScope.user = {
      uuid: '',
      firstName: 'Tyler',
      lastName: 'Durden',
      email: 'gabrielmalet@gmail.com',
      job: 'Founder of Chaos Project',
    }
  })
;