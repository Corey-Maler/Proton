const Flat = require('./flat');
const types = {};
types.bproj = require('./bproj');
types.com = require('./com');
types.ssbus = require('./ssbus');
types.blueprint = require('./blueprint');

const fs = require('fs');

//const jss = fs.readFileSync('./basic/ma');

const a = require('./basic/manifest.json');

for (let i in a.ext) {
  a.ext[i].ext = require('./basic/' + a.ext[i].file);
}

const plugins = [];
plugins.push(a);

console.log('manifest -> ', a);


const resolve = function(ext, opts) {
  console.log('ext >> ', ext, types);
  if (types[ext.substr(1)]) {
    return new types[ext.substr(1)](opts);
  } else {
    return new Flat(opts);
  }
};

resolve.plugins = plugins;

module.exports = resolve;
