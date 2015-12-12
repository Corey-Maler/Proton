const jade = require('jade');

const fs = require('fs');
const path = require('path');

module.exports = (t) => {
	const _path = path.resolve(__dirname, '../templates/'+t+'.jade');
	const templ = fs.readFileSync(_path);
	return jade.compile(templ);
}