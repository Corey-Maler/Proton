var ItemView = require('backbone.marionette').ItemView;
var remote = require('remote'); 
var BrowserWindow = remote.require('browser-window')

var ExitView = ItemView.extend({
	template: function() { return '<i class="zmdi zmdi-close"></i>' },
	events: {
		'click': 'doExit'
	},
	doExit: function() {
	  var window = BrowserWindow.getFocusedWindow();
      window.close();
	}
});

module.exports = ExitView;
