//  enable runtime transpilation to use ES6/7 in node

var fs = require('fs');
var path = require('path');

var babelrc = fs.readFileSync(path.resolve(__dirname, 'node_modules/universal-redux/.babelrc'));
var config;

try {
  config = JSON.parse(babelrc);
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.');
  console.error(err);
}

require('babel-core/register')(config);
