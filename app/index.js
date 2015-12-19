const Mm = require('backbone.marionette');
const RootView = require('./views/rootView');
const ExitView = require('./views/exitView');
const {Collection, Model} = require('backbone');
const Path = require('path');
const Fs = require('fs');


const ContentModel = require('./contentModel');

const FlatView = require('../plugins/flat');
const Window = require('./window');
const TreeView = require('./files');
const remote = require('remote');
const dialog = remote.require('dialog');
const App = require('./app');
const Readers = require('../plugins');

const $ = require('jquery');

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
App.rootView.window.show(Window);

App.on('openFile', (file, menuCollection, menuItem) => {
	const FilePath = Path.resolve(App.rootDir, file);
	const fileModel = new ContentModel({file: FilePath});
	const reader = Readers(Path.extname(file), {model: fileModel});
	reader.render();
	const tab = Window.add({name: file, fileModel, readerView: reader});
	menuItem.set('tab', tab);
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

$(window).keypress(function(event) {
    if (!(event.which == 115 && event.ctrlKey) && !(event.which == 19)) return true;
		const current = Tabs.getCurrent();
		current.set('changed', false);
		current.get('page').reader.save();
    event.preventDefault();
    return false;
});
