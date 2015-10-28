'use strict';

var env = require('./env');

module.exports = function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: env.templatePath('home.html'),
      controller: 'home.controller',
      showHeader: true,
    })
  ;

  $urlRouterProvider.otherwise('/home');
};