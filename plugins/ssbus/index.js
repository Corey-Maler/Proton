const {ItemView} = require('backbone.marionette');
const $ = require('jquery');
const {Model} = require('backbone');
const t = require('../../app/t');
const App = require('../../app/app');

const SerialPort = require('serialport');

const ProjectFile = ItemView.extend({
	template: t('plugins/ssbus'),
  initialize() {
    console.log('ssbus initialize >>> ', this);
    this.COM = App.getProvider('COM');
    const syb = new Model({type: 'sub', name: 'controller', provider: this});
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
