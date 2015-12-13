const {ItemView} = require('backbone.marionette');
const $ = require('jquery');
const {Model} = require('backbone');
const t = require('../../app/t');

const SerialPort = require('serialport');

const ProjectFile = ItemView.extend({
	template: t('plugins/com'),
  initialize() {
    this.refresh();
  },
  events: {
    'click .js-send-on': 'sendOn',
    'click .js-send-off': 'sendOff',
    'click .js-connect': 'connect',
    'click .js-refresh': 'refresh',
    'click .terminal': 'focusDiv',
    'keypress .terminal': 'keypressDiv'
  },

  sendOn() {
    this.serialPort.write('1', (e, r) => {console.log('writed 1 >>> ', e, r)});
  },

  sendOff() {
    this.serialPort.write('0', (e, r) => {console.log('writed 0 >>> ', e, r)});
  },

  refresh() {
    this.$el.find('.js-ports').empty();
    SerialPort.list((err, ports) => {
      console.log(ports);
      this.$el.find('.js-ports').append('<option>Not selected</option>');
      ports.forEach((port) => {
        const option = $('<option>');
        option.text(port.comName);
        option.attr('value', '\\\\.\\' + port.comName);
        this.$el.find('.js-ports').append(option);
      });
    });
  },

  connect(e) {
    console.log('>>> SELECT PORT >>', e, this, e.currentTarget.value);
    const port = this.$el.find('select').val();

    const serialPort = new SerialPort.SerialPort(port, {
      baudrate: 9600
    }, false); // this is the openImmediately flag [default is true]
    this.serialPort = serialPort;
    serialPort.open((error) => {
      if ( error ) {
        console.log('failed to open: '+error);
      } else {
        console.log('open');
        serialPort.on('data', (data) => {
          this.writeToTerm(data);
        });
      }
    });
  },
  changeName(e) {
    console.log('ON CHANGE');
    this.project.set('projectName', e.currentTarget.value);
    this.trigger('changed');
  },
	onRender() {

	},
  focusDiv() {
    this.$el.find('.terminal').focus();
    console.log('>>> FOCUS DIV');
  },

  keypressDiv(e) {
    if (this.serialPort) {
      const charCode = e.charCode;
      console.log('KEYPRESS >> ', e, charCode);
      const code = String.fromCharCode(charCode);
      this.writeToTerm(code);
      this.serialPort.write(code, (e, r) => {
        //this.$el.find('.terminal').append(document.createTextNode(r));
      });
    }
  },

  writeToTerm(k) {
    if (k === String.fromCharCode(13)) {
      this.$el.find('.terminal').append('<br />');
    } else {
      this.$el.find('.terminal').append(document.createTextNode(k));
    }
  },

  save() {
    console.warn('nothing to save');
  }
});


module.exports = ProjectFile;
