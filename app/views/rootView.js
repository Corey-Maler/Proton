var LayoutView = require('backbone.marionette').LayoutView;

var RootView = LayoutView.extend({
	el: 'body',
	regions: {
		tabs: '.c-tabs',
		content: '.c-content',
		sidebar: '.c-sidebar',
		exit: '.c-exit'
	}
});

module.exports = RootView;