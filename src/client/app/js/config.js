'use strict';

var env = require('./env');

module.exports = function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: env.templatePath('home.html'),
      controller: 'home.controller'
    });

  $urlRouterProvider.otherwise('/home');
};