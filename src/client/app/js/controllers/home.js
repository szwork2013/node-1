'use strict';

module.exports = function($scope) {
  $scope.greetings = [
    '¡Hola Mundo!', 'مرحبا العالم!', 'Kamusta sa Lahat!', 'העלא וועלט!', 'Hallo Welt!',
    'ハローワールド！', '안녕하세요!', '你好世界！', 'Hej världen!', 'Olá Mundo!',
    'नमस्ते विश्व!', 'Bonjour le monde!', 'Ciao mondo!', 'Hej Verden!', 'Привет мир!'
  ][(Math.floor(Math.random() * 15))];
};