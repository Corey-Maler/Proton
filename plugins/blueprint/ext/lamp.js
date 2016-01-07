const $ = require('jquery');

const Led = function() {
  const $el = $('<div>');
  
  const $lamp = $('<span>');
  $lamp.text('###');

  $lamp.css({color: '#f00'});

  $el.append($lamp);

  const Input = {
    title: 'val',
    size: '1b',
    rr: 'gsdf',
    emit(val) {
      $lamp.css({color: val?'#0f0':'#f00'});
    }
  }

  this.inputs = [Input];
  this.outputs = [];

  this.html = $el.get(0);
};


module.exports = Led;
