var Mm = require('backbone.marionette');
var RootView = require('./views/rootView');
var ExitView = require('./views/exitView');

const Path = require('path');
const Fs = require('fs');

const {Collection, Model} = require('backbone');
const ContentModel = require('./contentModel');

const FlatView = require('../plugins/flat');
var Tabs = require('./tabs');
const TreeView = require('./files');

const App = require('./app');

App.rootView = new RootView();

App.on('doOpenProject', () => {
	console.log('open project');
	var remote = require('remote');
  var dialog = remote.require('dialog');
	dialog.showOpenDialog({ filters: [
   { name: 'Proton project', extensions: ['bproj'] }
 ]}, function (fileNames) {
	  if (fileNames === undefined) return;
	  var fileName = fileNames[0];
	  Fs.readFile(fileName, 'utf-8', function (err, data) {
	    console.log('project opened >>> ', data)
	  });
 	});
});

// resolve path
App.projFilePath = "";
App.rootDir = Path.resolve(__dirname);

App.rootView.exit.show(new ExitView());
App.rootView.tabs.show(Tabs);

App.on('openFile', (file, menuCollection) => {
	console.log('>>> Open file', file, menuCollection);
	const FilePath = Path.resolve(App.rootDir, file);
	const content = Fs.readFileSync(FilePath);
	console.log('>> readfile ', FilePath);
	console.log('>> content:', content);
	const reader = new FlatView({model:
		new ContentModel({content})
	});
	reader.render();
	Tabs.add({name: file, reader: reader});
});

var dirTree = require('directory-tree');
var tree = dirTree.directoryTree(__dirname);

console.log('>>>', tree);

App.project = new Model({projectName: 'my project'});

App.rootView.sidebar.show(new TreeView({
	model: App.project,
	collection: new Collection(tree)
}));

App.on('setContent', (plugin) => {
	App.rootView.content.$el.html(plugin.el);
});
