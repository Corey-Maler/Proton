var ItemView = require('backbone.marionette').ItemView;
var t = require('../../t');

var ItemView = ItemView.extend({
	className: 'window-item',
	template: false,
	initialize(opts) {
		console.log('a', opts, this, this.model);
	},
	modelEvents: {
        'change:active': 'showHide'
  },
	showHide() {
		console.log('show hide');
	},
	onRender() {
		this.$el.append(this.model.get('readerView').$el);
	}
});

module.exports = ItemView;
