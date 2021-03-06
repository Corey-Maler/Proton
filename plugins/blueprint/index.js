const {CompositeView} = require('backbone.marionette');
const $ = require('jquery');
const {Model, Collection} = require('backbone');
const t = require('../../app/t');
const App = require('../../app/app');


const interact = require('interact.js');
const Snap = require('snapsvg');

const Switch = require('./ext/switch.js');
const Lamp = require('./ext/lamp.js');
const AndExt = require('./ext/and.js');

const Element = require('./views/element');

let s;

const genPath = function(x1, y1, x2, y2) {
  let mx1 = (x1 + x2) / 2;
  let mx2 = mx1;
  if (x2 - x1 < 100) {
    mx1 = x1 + 50;
    mx2 = x2 - 50;
  }
  return 'M' + x1 + ' ' + y1 + ' C ' + mx1 + ' ' + y1 + ', ' + mx2 + ' ' + y2 + ', ' + x2 + ' ' + y2;
}

const ports = {};

let BBB;
let connectionPath;

let CON = false;

const links = {
  putPort(inp, port) {
    console.log('inp >> ', inp, port);
    ports[port] = inp;
  
    inp.$el.on('click', (e) => {
      e.preventDefault();
      if (!CON) {
        CON = inp;
        connectionPath.attr({stroke: '#afa'});
        const gg = inp.$el.offset();
        // fix blink on new connection
        const offset = BBB.offset();
        const aa = genPath(gg.left - offset.left + 6, gg.top - offset.top + 6, gg.left - offset.left + 6, gg.top - offset.top + 6);
        connectionPath.attr('d', aa);
        BBB.on('mousemove', (ex) => {
          const aa = genPath(gg.left - offset.left + 6, gg.top - offset.top + 6, ex.pageX - offset.left, ex.pageY - offset.top);
          connectionPath.attr('d', aa);
        });
      } else {
        link(CON, inp);
        CON = null;
        BBB.off('mousemove');
        connectionPath.attr({stroke: 'rgba(0, 0, 0, 0)'});
      }
      return false;
    });

    inp.$el.on('mousedown', () => {
      return false;
    });

  },

  a: 3,
};

const gas = [];

const link = function(input, output) {
  const ll = {};

  ll.input = input;
  ll.output = output;

  //const P1 = input.$el.position();
  //const P2 = input.$el.position();

  console.log('##### ', $('.blueprint').offset());
  console.log(input.$el.offset());

  const P = $('.blueprint').offset();
  let P1 = input.$el.offset();
  let P2 = output.$el.offset();

  const aa = genPath(P1.left - P.left + 6, P1.top - P.top + 6, P2.left - P.left + 6, P2.top - P.top + 6);
  ll.path = s.path(aa);
  ll.path.attr({stroke: '#fff', fill: 'none'});

  input.on('moved', () => {
    P1 = input.$el.offset();
    const aa = genPath(P1.left - P.left + 6, P1.top - P.top + 6, P2.left - P.left + 6, P2.top - P.top + 6);
    ll.path.attr('d', aa);
  });

  output.on('moved', () => {
    P2 = output.$el.offset();
    const aa = genPath(P1.left - P.left + 6, P1.top - P.top + 6, P2.left - P.left + 6, P2.top - P.top + 6);
    ll.path.attr('d', aa);
  });

  input.model.attributes.on('message', (val) => {
    console.log('EMITED!', val);
    output.model.attributes.emit(val);
  });

  gas.push(ll);
}

const ProjectFile = CompositeView.extend({
	template: t('plugins/blueprint'),
  initialize() {
    // const ASD = App.getProvider('ss');
    // console.log('ASD ++++++++++', ASD);

    // const AA = ASD.get('ext');

    /*
    this.collection.add({
      a: 4, pos: [320, 40], ext: new AA()
    });
    */
    console.log('ssbus initialize >>> ', this);
  },
  childView:  Element,
  className: 'blueprint',
  childViewContainer: '.childs',
  childEvents: {
    'elementMove': 'elementMove',
  },

  childViewOptions: {links: links},

  events: {
    'click': () => {
      CON = null;
      BBB.off('mousemove');
      connectionPath.attr({stroke: 'rgba(0, 0, 0, 0)'});
    }, 
    'click .js-add-button': 'add_button',
    'click .js-add-led': 'add_led'
  },

  add_button() {
    this.collection.add({
      a: 55, pos: [50, 50], ext: new Switch()
    });
  },

  add_led() {
    this.collection.add({
      a: 5532, pos: [100, 100], ext: new Lamp()
    });
  },

  elementMove(child, x, y) {
    const i = child.model.get('a');
    if (i === 1) {
      this.a1 = [x, y];  
    } else {
      this.a2 = [x, y];
    }
    const aa = genPath(this.a1[0], this.a1[1], this.a2[0], this.a2[1]);
    this.connection.attr('d', aa);
  },

  collection: new Collection([
    {a: 1, pos: [30, 40], ext: new Switch()},
    {a: 3, pos: [30, 140], ext: new Switch()},
    {a: 2, pos: [400, 230], ext: new Lamp()},
    {a: 54, pos: [30, 300], ext: new AndExt()}
  ]),
  onRender() {

    this.$el.find('.add .btn').click(function() {
      $(this).parent().toggleClass('full');
    });

    const $groups = this.$el.find('.add .groups');

    const plugins = require('../../plugins/index');
    console.log('EXT >>> ',plugins , plugins.plugins);
    const ext = plugins.plugins;

    for (let i in ext) {
      if (ext[i].ext && ext[i].ext.length) {
        const gr = $('<div>').addClass('group');
        const $gr_title = $('<div>').addClass('group-title');
        $gr_title.text(ext[i].name);
        gr.append($gr_title);
        $groups.append(gr);

        const $items = $('<div>').addClass('items');
        gr.append($items);

        for (let j in ext[i].ext) {
          const asd = ext[i].ext[j];
          const dd = $('<div>').addClass('item').text(asd.name);
          dd.click(() => {
            this.collection.add({
              a: 5532, pos: [100, 100], ext: new asd.ext()
            })
          });

          $items.append(dd);
        }
      }
    } 



    const links = this.$el.find('.links').get(0);
    setTimeout(() => {
    links.setAttribute('width', this.$el.width());
    links.setAttribute('height', this.$el.height());
    }, 2);

    s = Snap(links);

    const aa = genPath(0, 0, 0, 0);
    connectionPath = s.path(aa);
    connectionPath.attr({stroke: 'rgba(0, 0, 0, 0)', fill: 'none'});

    BBB = this.$el;

    },
});

module.exports = ProjectFile;
