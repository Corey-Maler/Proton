const Collection = require('backbone').Collection;

const TabModel = require('../models/tab');

const TBs = Collection.extend({model: TabModel});

module.exports = TBs;