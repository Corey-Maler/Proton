const Flat = require('./flat');
const types = {};
types.bproj = require('./bproj');


const resolve = function(ext, opts) {
  console.log('ext >> ', ext, types);
  if (types[ext.substr(1)]) {
    return new types[ext.substr(1)](opts);
  } else {
    return new Flat(opts);
  }
};

module.exports = resolve;
