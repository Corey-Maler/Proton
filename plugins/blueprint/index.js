const {CompositeView} = require('backbone.marionette');
const $ = require('jquery');
const {Model, Collection} = require('backbone');
const t = require('../../app/t');
const App = require('../../app/app');

const interact = require('interact.js');
const Snap = require('snapsvg');

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

  gas.push(ll);
}

const ProjectFile = CompositeView.extend({
	template: t('plugins/blueprint'),
  initialize() {
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
    }
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

  collection: new Collection([{a: 1, pos: [30, 40]}, {a: 2, pos: [400, 230]}]),
  onRender() {
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
