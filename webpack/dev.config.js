var path = require('path');
var webpack = require('webpack');
var writeStats = require('./utils/writeStats');
var notifyStats = require('./utils/notifyStats');
var assetsPath = path.resolve(__dirname, '../static/dist');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
var host = 'localhost';
var port = parseInt(process.env.PORT) + 1 || 3001;

var publicPath = 'http://' + host + ':' + port + '/dist/';
var commonLoaders = [{
  test: /\.(jpe?g|png|gif|svg)$/,
  loader: 'file'
}];

module.exports = {
  browser: {
    name: 'browser bundle',
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
      publicPath: publicPath
    },
    module: {
      loaders: commonLoaders.concat([{
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel?stage=0&optional=runtime&plugins=typecheck']
      }])
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
        __SERVER__: false
      }),

      // stats
      function() {
        this.plugin('done', notifyStats);
      },
      function() {
        this.plugin('done', writeStats);
      }
    ]
  },

  server: {
    name: 'server bundle',
    entry: './src/views/routes.js',
    target: 'node',
    bail: true,
    output: {
      path: __dirname,
      filename: '../src/server-routes.bundle.js',
      publicPath: publicPath,
      libraryTarget: 'commonjs2'
    },
    externals: /^[a-z\-0-9]+$/,
    module: {
      loaders: commonLoaders.concat([{
        test: /\.scss$/,
        loader: 'css/locals!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true'
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel?stage=0&optional=runtime&plugins=typecheck']
      }])
    },
    plugins: [
      new webpack.NoErrorsPlugin(),
      new webpack.DefinePlugin({
        __CLIENT__: false,
        __SERVER__: true
      })
    ]
  }
};
