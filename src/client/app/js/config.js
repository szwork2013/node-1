'use strict';

var env = require('./env');

module.exports = function ($stateProvider, $urlRouterProvider, $translateProvider) {
  $stateProvider
    .state('app', {
      abstract: true,
      url: '/app',
      templateUrl: env.templatePath('common/content.html'),
      data: { includes: true }
    })
    .state('app.home', {
      url: '/home',
      templateUrl: env.templatePath('home.html'),
    })
    .state('account', {
      abstract: true,
      url: '/account',
      templateUrl: env.templatePath('common/content.html'),
      data: { includes: true }
    })
    .state('account.profile', {
      url: '/profile',
      templateUrl: env.templatePath('profile.html'),
    })
    .state('account.contact', {
      url: '/contact',
      templateUrl: env.templatePath('contact.html'),
    })
    .state('login', {
      url: '/login',
      templateUrl: env.templatePath('login.html'),
      data: { includes: false }
    })
  ;

  $urlRouterProvider.otherwise('app/home');

  require('./translations')($translateProvider);
};