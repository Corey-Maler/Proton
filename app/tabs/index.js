var TabCollection = require('./collections/tabs');

var tt = new TabCollection([{title: 'a', active: true}, {title: 'b'}]);

var ItemView = require('./views/item');
var ListView = require('./views/tabs');

var Tabs = new ListView({childView: ItemView, collection: tt});

module.exports = Tabs;