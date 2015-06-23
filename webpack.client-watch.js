var webpack = require("webpack"),
  fs = require('fs'),
  path = require('path'),
  configs = require("./webpack.client.js"),
  loaders = require('./loaders'),
  config = configs[0];

config.cache = true;
config.debug = true;
config.devtool = "eval";

config.entry.unshift(
  "webpack-dev-server/client?http://localhost:8080",
  "webpack/hot/only-dev-server"
);

config.output.publicPath = "http://localhost:8080/dist/";
config.output.hotUpdateMainFilename = "update/[hash]/update.json";
config.output.hotUpdateChunkFilename = "update/[hash]/[id].update.js";

config.plugins = [
  new webpack.DefinePlugin({__CLIENT__: true, __SERVER__: false}),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
];

config.module = {
  loaders: loaders.concat([
    {
      include: /\.js$/,
      loaders: ['react-hot', 'babel-loader?stage=0&optional=runtime&plugins=typecheck'],
      exclude: /node_modules/
    }])
};
config.devServer = {
  publicPath: "http://localhost:8080/dist/",
  contentBase: "./static",
  hot: true,
  inline: true,
  lazy: false,
  quiet: true,
  noInfo: false,
  headers: {"Access-Control-Allow-Origin": "*"},
  stats: {colors: true},
  host: "0.0.0.0"
};

module.exports = config;
