'use strict';

module.exports = {
  appName: 'FeedMe',
  baseTemplateDir: '/partials/',

  templatePath: function (view) { return [this.baseTemplateDir, view].join(''); }
};