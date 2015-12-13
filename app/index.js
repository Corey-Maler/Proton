const Mm = require('backbone.marionette');
const RootView = require('./views/rootView');
const ExitView = require('./views/exitView');
const {Collection, Model} = require('backbone');
const Path = require('path');
const Fs = require('fs');


const ContentModel = require('./contentModel');

const FlatView = require('../plugins/flat');
const Tabs = require('./tabs');
const TreeView = require('./files');
const remote = require('remote');
const dialog = remote.require('dialog');
const App = require('./app');
const Readers = require('../plugins');

App.rootView = new RootView();

let projPath = localStorage.projPath;


App.on('doOpenProject', () => {
	dialog.showOpenDialog({ filters: [{ name: 'Proton project', extensions: ['bproj'] }]},
	function (fileNames) {
	  if (fileNames === undefined) return;
	  const fileName = fileNames[0];
		localStorage.projPath = fileName;
		projPath = fileName;
		RunApp();
 	});
});

App.rootView.exit.show(new ExitView());
App.rootView.tabs.show(Tabs);

App.on('openFile', (file, menuCollection) => {
	console.log('>>> Open file', file, menuCollection);
	const FilePath = Path.resolve(App.rootDir, file);
	const content = Fs.readFileSync(FilePath);
	console.log('>> readfile ', FilePath);
	console.log('>> content:', content);
	const reader = Readers(Path.extname(file), {model: new ContentModel({content})});
	reader.render();
	Tabs.add({name: file, reader: reader});
});

App.on('setContent', (plugin) => {
	App.rootView.content.$el.html(plugin.el);
});

function RunApp() {
	App.projFilePath = projPath;
	App.rootDir = Path.dirname(projPath);
	var dirTree = require('directory-tree');
	var tree = dirTree.directoryTree(App.rootDir);

	App.project = new Model(JSON.parse(Fs.readFileSync(App.projFilePath, 'utf-8')));

	App.rootView.sidebar.show(new TreeView({
		model: App.project,
		collection: new Collection(tree)
	}));
}

if (!projPath) {
	App.trigger('doOpenProject');
} else {
	RunApp();
}
