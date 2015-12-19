var CollectionView = require('backbone.marionette').CollectionView;
const TabModel = require('../models/tab');
const App = require('../../app');
const TabView = require('./tab');

const TabsView = CollectionView.extend({
	childView: TabView,
	childEvents: {
		'select': 'select'
	},
	initialize() {
		console.log('tabs view initialize >>> ', this);
	},
	select(a, b) {
		this.collection.each((tab) => {
			tab.set('active', false);
		})
		a.model.set('active', true);
		App.trigger('setContent', a.model.get('page').reader)
	},
	getCurrent() {
		const current = this.collection.where({active: true});
		return current[0];
	}
});

module.exports = TabsView;
