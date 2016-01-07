const {ItemView} = require('backbone.marionette');

const InOut = ItemView.extend({
  template: false,
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
