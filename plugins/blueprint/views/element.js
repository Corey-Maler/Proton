const {LayoutView} = require('backbone.marionette');
const t = require('../../../app/t');
const {Collection} = require('backbone');

const InOuts = require('./inputs');

const ElementView = LayoutView.extend({
  template: t('plugins/blueprint.element'),
  className: 'blueprint-element',
  initialize(opts) {
    this.links = opts.links;
    this.X = 0;
    this.Y = 0;

    this.draggable = false;
  },

  regions: {
    'inputs': '.inputs',
    'outputs': '.outputs',
  },

  onRender() {
    const pos = this.model.get('pos');
      this.$el.css({
        top: pos[1] + 'px',
        left: pos[0] + 'px',
      });

      this.magic1 = new InOuts({
        collection: new Collection([{title: 'asd', rr: 'b'}, {title: 'add', rr: 'g'}, {title: 'ad', rr: '3'}]),
        childViewOptions: {links: this.links},
      });
      this.inputs.show(this.magic1);
      this.magic = new InOuts({collection: new Collection([{title: 'asd', rr: 'a'}, {'title': 'gasdf', rr: 'd'}]),
        childViewOptions: {links: this.links},
      });
      this.outputs.show(this.magic);

  },
  events: {
    'mousedown': 'mousedown',
    'mousemove': 'mousemove',
    'mouseup': 'mouseup',
  },

  mousedown(e) {
    console.log('click', e);
    const x = e.clientX;
    const y = e.clientY;

    this.X = x;
    this.Y = y;

    this.draggable = true;
  },
  
  // FIXME add timeout to detect drag
  mousemove(e) {
    if (!this.draggable) return;
    const x = e.clientX;
    const y = e.clientY;

    const dx = this.X - x;
    const dy = this.Y - y;

    this.X = x;
    this.Y = y;

    const offset = this.$el.position();
    this.$el.css({
      top: (offset.top - dy) + 'px',
      left: (offset.left - dx) + 'px',
    });

    this.magic.children.each(m => {
      m.trigger('moved');
    });
    this.magic1.children.each(m => {
      m.trigger('moved');
    });



    //this.triggerMethod('elementMove', offset.left - dx, offset.top - dy);


  },

  mouseup(e) {
    this.draggable = false;
  },


});

module.exports = ElementView;
