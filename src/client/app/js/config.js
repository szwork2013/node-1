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
    .state('app.account.profile', {
      url: '/profile',
      templateUrl: env.templatePath('profile.html'),
    })
    .state('app.account.contact', {
      url: '/contact',
      templateUrl: env.templatePath('contact.html'),
    })
  ;

  $urlRouterProvider.otherwise('app/home');

  require('./translations')($translateProvider);
};