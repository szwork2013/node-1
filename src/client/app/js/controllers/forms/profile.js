'use strict';

module.exports = ['$rootScope', '$scope',
  function($rootScope, $scope) {
    $scope.update = function() {
      console.log('update');
    }
  }
];