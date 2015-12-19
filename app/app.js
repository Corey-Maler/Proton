var Mm = require('backbone.marionette');
var App = new Mm.Application();

const providers = {};

// FIXME: change API for providers

App.addProvider = function(name, provider) {
  providers[name] = provider;
}

App.getProvider = function(query) {
  return providers[query];
}

module.exports = App;
