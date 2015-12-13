const {Model} = require('backbone');
const Fs = require('fs');

const ContentModel = Model.extend({
	initialize() {
		this.set('content', Fs.readFileSync(this.get('file')));
	},
	save() {
		const content = this.get('content');
		Fs.writeFileSync(this.get('file'), content, 'utf8');
	}
});

module.exports = ContentModel;
