var ItemView = require('backbone.marionette').ItemView;

var t = require('../../t');

var TabView = ItemView.extend({
	template: t('common/tab'),
	className: 'tab',
	initialize(opts) {
		console.log('a', opts, this, this.model);
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
		console.log('field changed >>>');
        this.render();
    },
	onRender() {
		console.log('on render >>');
		if (this.model.get('active')) {
			this.$el.addClass('active');
		} else {
			this.$el.removeClass('active');
		}
	}
});

module.exports = TabView;