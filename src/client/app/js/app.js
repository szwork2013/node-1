'use strict';

// External
require('angular');
require('angular-ui-router');

// Internal
require('./controllers');
require('./directives');

var app = angular.module('feedme', ['ui.router', 'feedme.controllers', 'feedme.directives']);
app.config(require('./config'));