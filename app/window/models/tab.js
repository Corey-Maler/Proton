const {Model} = require('backbone');

const TabModel = Model.extend({
	initialize() {
		console.log('initialize TabModel >> ', this);
		this.get('fileModel').on('change', () => {
			this.set('changed', true);
		})
	}
});

module.exports = TabModel;
