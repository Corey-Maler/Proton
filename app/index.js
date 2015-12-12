var Mm = require('backbone.marionette');
var RootView = require('./views/rootView');
var ExitView = require('./views/exitView');

const {Collection} = require('backbone');

var Tabs = require('./tabs');
const TreeView = require('./files');

const App = require('./app');

App.rootView = new RootView();

App.rootView.exit.show(new ExitView());
App.rootView.tabs.show(Tabs);

var dirTree = require('directory-tree');
var tree = dirTree.directoryTree(__dirname);

console.log('>>>', tree);

App.rootView.sidebar.show(new TreeView({
	collection: new Collection(tree)
}));