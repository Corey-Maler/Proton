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
    this.provider = App.getProvider('COM');
  },
  events: {
    'click .js-on': 'doOn',
    'click .js-off': 'doOff',
  },
  doOn() {
    this.provider.write("1");
    console.log("ON!");
  },
  doOff() {
    this.provider.write("0");
    console.log("OFF!");
  }
});


module.exports = ProjectFile;
