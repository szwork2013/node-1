'use strict';

require('metismenu');

module.exports = function($timeout) {
  return {
    restrict: 'A',
    link: function(scope, element) {
      $timeout(function(){
        element.metisMenu();
      });
    }
  };
};