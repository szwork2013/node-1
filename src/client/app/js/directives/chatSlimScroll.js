'use strict';

require('jquery-slimscroll/jquery.slimscroll');

module.exports = function($timeout) {
  return {
    restrict: 'A',
    link: function(scope, element) {
      $timeout(function(){
        element.slimscroll({
          height: '234px',
          railOpacity: 0.4,
          start: 'bottom',
        });
      });
    }
  };
};
