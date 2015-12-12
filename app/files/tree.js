const {CompositeView} = require('backbone.marionette');
const t = require('../t');

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
			this.collection.add({name: 'submodule', type:"sub"}, 
			{name: 'submodule', type:"sub"});
		}
	}
})

module.exports = FolderView;