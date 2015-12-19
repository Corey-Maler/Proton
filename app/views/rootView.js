var LayoutView = require('backbone.marionette').LayoutView;

var RootView = LayoutView.extend({
	el: 'body',
	regions: {
		window: '.c-window',
		sidebar: '.c-sidebar',
		exit: '.c-exit'
	}
});

module.exports = RootView;
