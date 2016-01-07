const {CollectionView} = require('backbone.marionette');
const inOut = require('./inputOutput');

const InputsOutputs = CollectionView.extend({
  childView: inOut
});

module.exports = InputsOutputs;
