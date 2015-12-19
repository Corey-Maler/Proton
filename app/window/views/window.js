const {LayoutView} = require('backbone.marionette');
const TabCollection = require('../collections/tabs');

const t = require('../../t');

const TabModel = require('../models/tab');
const ItemsView = require('./items');
const TabsView = require('./tabs');

const Window = LayoutView.extend({
  template: t('common/window'),
  regions: {
    tabs: '.region-tabs',
    items: '.region-items'
  },
  initialize(opts) {
    this.collection = new TabCollection([]);;
  },
  add({name, fileModel, readerView}) {
    // asd
    const tab = new TabModel({title: name, fileModel, readerView});
    this.collection.add(tab);
  },
  onShow() {
    this.items.show(new ItemsView({collection: this.collection}));
    this.tabs.show(new TabsView({collection: this.collection}));
  }
});

module.exports = Window;
