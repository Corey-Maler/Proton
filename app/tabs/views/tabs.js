var CollectionView = require('backbone.marionette').CollectionView;
const TabModel = require('../models/tab');
const App = require('../../app');

module.exports = CollectionView.extend({
	childEvents: {
		'select': 'select'
	},
	select(a, b) {
		this.collection.each((tab) => {
			tab.set('active', false);
		})
		a.model.set('active', true);
		App.trigger('setContent', a.model.get('page').reader)
	},
	add(Page) {
		const tab = new TabModel({title: Page.name, page: Page});
		this.collection.add(tab);
		this.select({model: tab});
		return tab;
	},
	getCurrent() {
		const current = this.collection.where({active: true});
		return current[0];
	}
});
