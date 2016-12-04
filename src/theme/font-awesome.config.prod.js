const fontAwesomeConfig = require('./font-awesome.config.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
fontAwesomeConfig.styleLoader = ExtractTextPlugin.extract({
  fallbackLoader: 'style-loader',
  loader: 'css-loader!less-loader'
});
module.exports = fontAwesomeConfig;
