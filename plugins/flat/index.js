const {ItemView} = require('backbone.marionette');
const Ace = require('../../ace/src/ace');

const FlatFile = ItemView.extend({
	template: false,
	onRender() {
		this.$el.text(this.model.get('content'));
		this.$el.addClass('fillContainer');
		console.log('Ace', Ace, ace)
		this.editor = ace.edit(this.el);
	}
});


module.exports = FlatFile;
