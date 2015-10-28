'use strict';

// External
require('angular');
require('angular-ui-router');
require('angular-translate');
require('angular-ui-bootstrap');

// Internal
require('./controllers');
require('./directives');

var app = angular.module('feedme', ['ui.router', 'ui.bootstrap', 'feedme.controllers', 'feedme.directives', 'pascalprecht.translate']);
app.config(require('./config'));