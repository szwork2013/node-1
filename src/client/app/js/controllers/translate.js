'use strict';

module.exports = function($scope, $translate) {
  $scope.changeLanguage = function (langKey) {
    $translate.use(langKey);
  };
};