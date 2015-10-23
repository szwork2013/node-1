'use strict';

require('angular');

var controllers = module.exports = angular.module('FeedMe.controllers', []);

controllers.controller('HomeController', function ($scope) {

  // A sample controller implementation to show greetings randomly from a list
  $scope.greetings = [
    '¡Hola Mundo!', 'مرحبا العالم!', 'Kamusta sa Lahat!', 'העלא וועלט!', 'Hallo Welt!',
    'ハローワールド！', '안녕하세요!', '你好世界！', 'Hej världen!', 'Olá Mundo!',
    'नमस्ते विश्व!', 'Bonjour le monde!', 'Ciao mondo!', 'Hej Verden!', 'Привет мир!'
  ][(Math.floor(Math.random() * 15))];

});