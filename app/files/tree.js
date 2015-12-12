const {CompositeView} = require('backbone.marionette');
const t = require('../t');
const app = require('../app');

const {Collection} = require('backbone');

const FolderView = CompositeView.extend({
	template: t('folder'),
	childViewContainer: '.child',
	tagName: 'li',
	className: 'folder',
	initialize: function() {
		this.collection = new Collection(this.model.get('children'));
	},
	events: {
		'click h4': 'select'
	},
	select(e) {
		e.stopPropagation();
		console.log('selected', this.model, this.$el.find('ul'));
		if (this.model.get('type') == 'directory') {
			this.$el.find('ul').eq(0).slideToggle(300);
		} else {
			app.trigger('openFile', this.model.get('path'), this.collection);
		}
	}
})

module.exports = FolderView;