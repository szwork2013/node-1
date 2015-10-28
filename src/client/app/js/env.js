'use strict';

module.exports = {
  appName: 'FeedMe',
  baseTemplateDir: '/views/',

  templatePath: function (view) { return [this.baseTemplateDir, view].join(''); }
};