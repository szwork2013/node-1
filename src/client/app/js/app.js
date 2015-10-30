'use strict';

// Global
window.$ = window.jQuery = require('jquery');

// External
require('angular');
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
    $rootScope.rightSidebar = false;
    // Fixture
    $rootScope.user = {
      firstName: 'Tyler',
      lastName: 'Durden',
      job: 'Founder of Chaos Project',
    }
  })
;