const $ = require('jquery');

const EventEmitter = require('events');

const AndExt = function() {
  const $el = $('<div>');

  $el.text('&');

  const Opu = new EventEmitter();

  Opu.title = "Q";
  Opu.size = "1'b";
  Opu.rr = "ggh2";

  this.outputs = [Opu];

  let v1 = 0;
  let v2 = 0;

  const Inp1 = {
    title: 'A',
    size: "1'b",
    rr: 'gasdf',
    emit(val) {
      v1 = val;
      Opu.emit('message', v1 & v2)
    }
  }

  const Inp2 = {
    title: 'B',
    size: "1'b",
    rr: 'gasgasdg',
    emit(val) {
      v2 = val;
      Opu.emit('message', v1 & v2);
    }
  }

  this.inputs = [Inp1, Inp2];

  this.html = $el.get(0);
}


module.exports = AndExt;
