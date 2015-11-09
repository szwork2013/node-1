'use strict';

var env = require('./env');

module.exports = function (
  $stateProvider, $urlRouterProvider, $translateProvider, authProvider, jwtInterceptorProvider, $httpProvider
) {
  $stateProvider
    .state('app', {
      abstract: true,
      url: '/app',
      templateUrl: env.templatePath('common/content.html'),
      data: { includes: true, requiresLogin: true },
    })
    .state('app.home', {
      url: '/home',
      templateUrl: env.templatePath('home.html'),
    })
    .state('account', {
      abstract: true,
      url: '/account',
      templateUrl: env.templatePath('common/content.html'),
      data: { includes: true , requiresLogin: true },
    })
    .state('account.profile', {
      url: '/profile',
      templateUrl: env.templatePath('profile.html'),
    })
    .state('account.manage', {
      url: '/manage',
      templateUrl: env.templatePath('manage.html'),
    })
    .state('account.contact', {
      url: '/contact',
      templateUrl: env.templatePath('contact.html'),
    })
    .state('login', {
      url: '/login',
      templateUrl: env.templatePath('login.html'),
      data: { includes: false },
    })
  ;

  $urlRouterProvider.otherwise('app/home');

  authProvider.init(require('./auth0/config.json'));

  jwtInterceptorProvider.tokenGetter = ['store', function(store) {
    return store.get('token');
  }];

  $httpProvider.interceptors.push('jwtInterceptor');

  require('./translations')($translateProvider);
};