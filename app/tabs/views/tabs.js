var CollectionView = require('backbone.marionette').CollectionView;

module.exports = CollectionView.extend({
	childEvents: {
		'select': 'select'
	},
	select(a, b) {
		console.log('select tab >>', a, b)
		this.collection.each((tab) => {
			tab.set('active', false);
		})
		a.model.set('active', true);
	}
});