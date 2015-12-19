const {CollectionView} = require('backbone.marionette');
const ItemView = require('./item');

const ItemsView = CollectionView.extend({
  childView: ItemView
});

module.exports = ItemsView;
