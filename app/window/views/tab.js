var ItemView = require('backbone.marionette').ItemView;
var t = require('../../t');

var TabView = ItemView.extend({
	template: t('common/tab'),
	className: 'tab',
	initialize(opts) {
		console.log('tab view initialize', opts, this, this.model);
	},

	modelEvents: {
        'change': 'fieldsChanged'
  },

	events: {
		'click': 'select'
	},

	select() {
		this.triggerMethod('select');
	},

  fieldsChanged: function() {
		if (this.model.get('active')) {
			this.$el.addClass('active');
		} else {
			this.$el.removeClass('active');
		}
		if (this.model.get('changed')) {
			this.$el.addClass('changed');
		} else {
			this.$el.removeClass('changed');
		}
	}
});

module.exports = TabView;
