var path = require('path');
var webpack = require('webpack');
var writeStats = require('./utils/writeStats');
var notifyStats = require('./utils/notifyStats');
var assetsPath = path.resolve(__dirname, '../static/dist');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var host = 'localhost';
var port = parseInt(process.env.PORT) + 1 || 3001;

module.exports = {
  devtool: 'eval-source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    'main': [
      'webpack-dev-server/client?http://' + host + ':' + port,
      'webpack/hot/only-dev-server',
      './src/client.js'
    ]
  },
  output: {
    path: assetsPath,
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: 'http://' + host + ':' + port + '/dist/'
  },
  module: {
    loaders: [
      { test: /\.(jpe?g|png|gif|svg)$/, loader: 'file' },
      { test: /\.js$/, exclude: /node_modules/, loaders: ['react-hot', 'babel?stage=0&optional=runtime&plugins=typecheck']},
      { test: /\.scss$/, loader: 'style!css!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true' }
    ]
  },
  progress: true,
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.json', '.js']
  },
  plugins: [
    // hot reload
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true  // <-------- DISABLE redux-devtools HERE
    }),

    // stats
    function () {
      this.plugin('done', notifyStats);
    },
    function () {
      this.plugin('done', writeStats);
    }
  ]
};
