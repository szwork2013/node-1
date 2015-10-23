'use strict';

module.exports = {
  appName: 'FeedMe',
  baseTemplateDir: '/src/app/partials/',

  templatePath: function (view) { return [this.baseTemplateDir, view].join(''); }
};