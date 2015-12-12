const {ItemView} = require('backbone.marionette');
const FlatFile = ItemView.extend({
	template: false,
	onRender() {
		this.$el.text(this.model.get('content'));
	}
});


module.exports = FlatFile;