'use strict';

require('angular').module('corpnet.socket-io', []).
  provider('socketFactory', function () {
    'use strict';

    var defaultPrefix = 'socket:', ioSocket;

    this.$get = ['$rootScope', '$timeout',
      function ($rootScope, $timeout) {

        var asyncAngularify = function (socket, callback) {
          return callback ? function () {
            var args = arguments;
            $timeout(function () {
              callback.apply(socket, args);
            }, 0);
          } : angular.noop;
        };

        return function socketFactory (options) {
          options = options || {};
          var socket = options.ioSocket || io.connect();
          var prefix = options.prefix === undefined ? defaultPrefix : options.prefix ;
          var defaultScope = options.scope || $rootScope;

          var addListener = function (eventName, callback) {
            socket.on(eventName, callback.__ng = asyncAngularify(socket, callback));
          };

          var addOnceListener = function (eventName, callback) {
            socket.once(eventName, callback.__ng = asyncAngularify(socket, callback));
          };

          return {
            on: addListener,
            addListener: addListener,
            once: addOnceListener,

            emit: function (eventName, data, callback) {
              var lastIndex = arguments.length - 1;
              var callback = arguments[lastIndex];
              if(typeof callback == 'function') {
                callback = asyncAngularify(socket, callback);
                arguments[lastIndex] = callback;
              }
              return socket.emit.apply(socket, arguments);
            },

            removeListener: function (ev, fn) {
              if (fn && fn.__ng) {
                arguments[1] = fn.__ng;
              }
              return socket.removeListener.apply(socket, arguments);
            },

            removeAllListeners: function() {
              return socket.removeAllListeners.apply(socket, arguments);
            },

            disconnect: function (close) {
              return socket.disconnect(close);
            },

            connect: function() {
              return socket.connect();
            },

            forward: function (events, scope) {
              if (events instanceof Array === false) {
                events = [events];
              }
              if (!scope) {
                scope = defaultScope;
              }
              events.forEach(function (eventName) {
                var prefixedEvent = prefix + eventName;
                var forwardBroadcast = asyncAngularify(socket, function () {
                  Array.prototype.unshift.call(arguments, prefixedEvent);
                  scope.$broadcast.apply(scope, arguments);
                });
                scope.$on('$destroy', function () {
                  socket.removeListener(eventName, forwardBroadcast);
                });
                socket.on(eventName, forwardBroadcast);
              });
            }
          };
        };
      }
    ];
  }
);