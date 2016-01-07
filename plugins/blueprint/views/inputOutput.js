const {ItemView} = require('backbone.marionette');
const t = require('../../../app/t');

const InOut = ItemView.extend({
  template: t('plugins/blueprint.inout'),
  className: 'input',
  onRender() {

  },

  initialize(opts) {
    this.links = opts.links;
    console.log('ARARAR +++ ', this.links);
    this.links.putPort(this, 'a:a:' + this.model.get('rr'));
  },
});

module.exports = InOut;
