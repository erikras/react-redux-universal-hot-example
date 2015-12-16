//  enable runtime transpilation to use ES6/7 in node

var fs = require('fs');

var babelrc = fs.readFileSync('./.babelrc');
var config;

try {
  config = JSON.parse(babelrc);
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.');
  console.error(err);
}

var Bluebird = require( 'bluebird' );
if( process.env.NODE_ENV !== 'production' ){
    Bluebird.longStackTraces();
}

require( 'babel-runtime/core-js/promise' ).default = Bluebird;
require('babel-core/register')(config);
