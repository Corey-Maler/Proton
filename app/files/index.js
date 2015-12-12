const FolderView = require('./tree');
const {CollectionView} = require('backbone.marionette');
const Backbone = require('backbone');

var MotherView = CollectionView.extend({
    childView: FolderView,
    tagName: 'ul'
});

module.exports = MotherView;