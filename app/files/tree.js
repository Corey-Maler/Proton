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
		if (this.model.get('type') == 'directory') {
			this.$el.find('ul').eq(0).slideToggle(300);
		} else {
			let tab = this.model.get('tab');
			if (tab) {
				app.trigger('openTab', tab);
			} else {
				app.trigger('openFile', this.model.get('path'), this.collection, this.model);
			}
		}
	}
})

module.exports = FolderView;
