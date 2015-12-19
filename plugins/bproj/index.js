const {ItemView} = require('backbone.marionette');

const {Model} = require('backbone');
const t = require('../../app/t');

const ProjectFile = ItemView.extend({
	template: t('plugins/bproj'),
  initialize() {
    this.project = new Model(JSON.parse(this.model.get('content')));
  },
  events: {
    'change .js-proj-name': 'changeName',
    'keyup .js-proj-name': 'changeName'
  },
  changeName(e) {
    this.project.set('projectName', e.currentTarget.value);
		this.model.set('content', JSON.stringify(this.project.toJSON()));
  },
	onRender() {
		this.$el.find('.js-proj-name').val(this.project.get('projectName'));
	},
  save() {
    this.model.set('content', JSON.stringify(this.project.toJSON()));
    this.model.save();
  }
});


module.exports = ProjectFile;
