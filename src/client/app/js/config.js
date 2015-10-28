'use strict';

var env = require('./env');

module.exports = function ($stateProvider, $urlRouterProvider, $translateProvider) {
  $stateProvider
    .state('app', {
      abstract: true,
      url: '/app',
      templateUrl: env.templatePath('common/content.html'),
    })
    .state('app.home', {
      url: '/home',
      templateUrl: env.templatePath('home.html'),
    })
  ;

  $urlRouterProvider.otherwise('app/home');

  require('./translations')($translateProvider);
};