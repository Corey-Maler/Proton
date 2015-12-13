const {ItemView} = require('backbone.marionette');

const FlatFile = ItemView.extend({
	template: false,
	onRender() {
    console.log('PROJECT FILE >> ', this.model);
		this.$el.text('PROJECT');
	}
});


module.exports = FlatFile;
