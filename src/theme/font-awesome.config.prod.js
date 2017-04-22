const buildExtractStylesLoader = require('./buildExtractStylesLoader');
const fontAwesomeConfig = require('./font-awesome.config.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

/**
 * buildExtractStylesLoader can also deal with options without any trouble as
 * it converts them to query parameters if needed.
 */
fontAwesomeConfig.styleLoader = buildExtractStylesLoader(ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: ['css-loader', 'less-loader'],
}));
module.exports = fontAwesomeConfig;
