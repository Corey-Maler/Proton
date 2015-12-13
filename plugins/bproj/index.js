const {ItemView} = require('backbone.marionette');

const {Model} = require('backbone');
const t = require('../../app/t');

const ProjectFile = ItemView.extend({
	template: t('plugins/bproj'),
  initialize() {
    this.project = new Model(JSON.parse(this.model.get('content')));
  },
  events: {
    'change .js-proj-name': 'changeName'
  },
  changeName(e) {
    console.log('>>>>', e);
    this.project.set('projectName', e.currentTarget.value);
    this.trigger('changed');
  },
	onRender() {
		this.$el.find('.js-proj-name').val(this.project.get('projectName'));
    console.log('PROJECT MODEL >>', this.project);
	},
  save() {
    this.model.set('content', JSON.stringify(this.project.toJSON()));
    console.log('BPROJ >> SAVE >>', this.model);
    this.model.save();
  }
});


module.exports = ProjectFile;
