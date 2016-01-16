const $ = require('jquery');
const EventEmitter = require('events');

const Switch = function() {
  const $el = $('<div>');
  const $checkbox = $('<input>');
  $el.append($checkbox);

  $checkbox.attr('type', 'checkbox');

  const Output = new EventEmitter();
  Output.title = "value";
  Output.size = '1b';
  Output.rr = 'gg3';

  $checkbox.on('change', () => {
    Output.emit('message', $checkbox.get(0).checked);
  });

  this.html = $el.get(0);

  this.inputs = [];
  this.outputs = [Output];

};

module.exports = Switch;
