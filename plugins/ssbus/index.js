const {ItemView} = require('backbone.marionette');
const $ = require('jquery');
const {Model} = require('backbone');
const t = require('../../app/t');
const App = require('../../app/app');

const EventEmitter = require('events');

const SerialPort = require('serialport');

const ProjectFile = ItemView.extend({
	template: t('plugins/ssbus'),
  initialize() {
    const self_ARARAR = this;
    console.log('ssbus initialize >>> ', this);
    this.COM = App.getProvider('COM');
    const syb = new Model({type: 'sub', name: 'controller', provider: this,
      ext: function() {
        console.log('INITIALIZE FUCKIN EXT');
        this.html = "asd";
        const inp = {};
        inp.title = "asd";
        inp.size = "1'b";
        inp.emit = (val) => {
          console.log('MESSAGE !!! >>> ', val);
          if (val) {
            self_ARARAR.doOn();
          } else {
            self_ARARAR.doOff();
          }
        };
        this.inputs = [inp];
        this.outputs = [];


    }});

    App.addProvider('ss', syb);

    this.model.get('subsystems').add(syb);
  },
  events: {
    'click .js-on': 'doOn',
    'click .js-off': 'doOff',
  },
  doOn() {
    this.COM.write("1");
    console.log("ON!");
  },
  doOff() {
    this.COM.write("0");
    console.log("OFF!");
  }
});


module.exports = ProjectFile;
