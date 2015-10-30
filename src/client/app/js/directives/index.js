'use strict';

var app = require('angular').module('feedme.directives', []);

app.directive('sideNavigation', require('./sideNavigation'));
app.directive('minimizeSidebar', require('./minimizeSidebar'));
app.directive('slimScroll', require('./slimScroll'));
app.directive('chatSlimScroll', require('./chatSlimScroll'));