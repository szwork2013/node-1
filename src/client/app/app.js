'use strict';

require('angular');
require('angular-ui-router');

require('./controllers');

var env = require('./env');

var app = module.exports = angular.module('FeedMe', [
  'ui.router',
  'FeedMe.controllers'
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
