'use strict';

require('angular');
require('angular-ui-router');

// require controllers ng-module definition
require('./controllers');

// require environment settings
var env = require('./env');
var _ = require('lodash');


var app = module.exports = angular.module('MyApp', [
  'ui.router',
  'MyApp.controllers'
]);

app.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: env.templatePath('home.html'),
      controller: 'HomeController'
    });

  $urlRouterProvider.otherwise('/home');
});
