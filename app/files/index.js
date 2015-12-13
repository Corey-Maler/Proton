const FolderView = require('./tree');
const {CompositeView} = require('backbone.marionette');
const Backbone = require('backbone');
const t = require('../t');
const app = require('../app');

var MotherView = CompositeView.extend({
    childView: FolderView,
    tagName: 'ul',
    template: t('rootFile'),
    childViewContainer: '.children',
    events: {
      'click .js-open-project': function() { app.trigger('doOpenProject') }
    }
});

module.exports = MotherView;
