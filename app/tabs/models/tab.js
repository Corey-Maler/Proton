const {Model} = require('backbone');

const TabModel = Model.extend({
	initialize() {
		console.log('this >> ', this);
		this.get('page').reader.on('changed', () => {
			this.set('changed', true);
		});
	}
});

module.exports = TabModel;
