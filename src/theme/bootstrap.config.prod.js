const bootstrapConfig = require('./bootstrap.config.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
bootstrapConfig.styleLoader = ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader');
module.exports = bootstrapConfig;

