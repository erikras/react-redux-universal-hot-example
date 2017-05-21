require('babel-polyfill');

// Webpack config for development
var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var helpers = require('./helpers');

var assetsPath = path.resolve(__dirname, '../static/dist');
var host = (process.env.HOST || 'localhost');
var port = (+process.env.PORT + 1) || 3001;

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

var babelrc = fs.readFileSync('./.babelrc');
var babelrcObject = {};

try {
  babelrcObject = JSON.parse(babelrc);
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.');
  console.error(err);
}

var babelrcObjectDevelopment = babelrcObject.env && babelrcObject.env.development || {};

// merge global and dev-only plugins
var combinedPlugins = babelrcObject.plugins || [];
combinedPlugins = combinedPlugins.concat(babelrcObjectDevelopment.plugins);

var babelLoaderQuery = Object.assign({}, babelrcObject, babelrcObjectDevelopment, { plugins: combinedPlugins });
delete babelLoaderQuery.env;

babelLoaderQuery.presets = babelLoaderQuery.presets.map(function (v) {
  return v === 'es2015' ? ['es2015', { modules: false }] : v;
});

var validDLLs = helpers.isValidDLLs('vendor', assetsPath);
if (process.env.WEBPACK_DLLS === '1' && !validDLLs) {
  process.env.WEBPACK_DLLS = '0';
  console.warn('webpack dlls disabled');
}

var webpackConfig = module.exports = {
  devtool: 'inline-source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    'main': [
      'webpack-hot-middleware/client?path=http://' + host + ':' + port + '/__webpack_hmr',
      'react-hot-loader/patch',
      'bootstrap-loader',
      'font-awesome-webpack!./src/theme/font-awesome.config.js',
      './src/client.js'
    ]
  },
  output: {
    path: assetsPath,
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: 'http://' + host + ':' + port + '/dist/'
  },
  performance: {
    hints: false
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'happypack/loader?id=jsx',
        include: [path.resolve(__dirname, '../src')]
      }, {
        test: /\.json$/,
        loader: 'happypack/loader?id=json',
        include: [path.resolve(__dirname, '../src')]
      }, {
        test: /\.less$/,
        loader: 'happypack/loader?id=less',
        include: [path.resolve(__dirname, '../src')]
      }, {
        test: /\.scss$/,
        loader: 'happypack/loader?id=sass',
        include: [path.resolve(__dirname, '../src')]
      }, {
        test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          mimetype: 'application/font-woff'
        }
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          mimetype: 'application/octet-stream'
        }
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          mimetype: 'image/svg+xml'
        }
      }, {
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        loader: 'url-loader',
        options: {
          limit: 10240
        }
      }
    ]
  },
  resolve: {
    modules: [
      'src',
      'node_modules'
    ],
    extensions: ['.json', '.js', '.jsx']
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      test: /\.(less|scss)/,
      options: {
        postcss: function (webpack) {
          return [
            require("postcss-import")({ addDependencyTo: webpack }),
            require("postcss-url")(),
            require("postcss-cssnext")({ browsers: 'last 2 version' }),
            // add your "plugins" here
            // ...
            // and if you want to compress,
            // just use css-loader option that already use cssnano under the hood
            require("postcss-browser-reporter")(),
            require("postcss-reporter")(),
          ]
        }
      }
    }),

    // hot reload
    new webpack.HotModuleReplacementPlugin(),

    new webpack.IgnorePlugin(/webpack-stats\.json$/),

    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true  // <-------- DISABLE redux-devtools HERE
    }),

    webpackIsomorphicToolsPlugin.development(),

    helpers.createHappyPlugin('jsx', [
      {
        loader: 'react-hot-loader/webpack'
      }, {
        loader: 'babel-loader',
        options: babelLoaderQuery
      }, {
        loader: 'eslint-loader',
        options: { emitWarning: true }
      }
    ]),
    helpers.createHappyPlugin('less', [
      {
        loader: 'style-loader',
        options: { sourceMap: true }
      }, {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 2,
          sourceMap: true,
          localIdentName: '[local]___[hash:base64:5]'
        }
      }, {
        loader: 'postcss-loader',
        options: {
          sourceMap: true
        }
      }, {
        loader: 'less-loader',
        query: {
          outputStyle: 'expanded',
          sourceMap: true
        }
      }
    ]),
    helpers.createHappyPlugin('sass', [
      {
        loader: 'style-loader',
        options: { sourceMap: true }
      }, {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 2,
          sourceMap: true,
          localIdentName: '[local]___[hash:base64:5]'
        }
      }, {
        loader: 'postcss-loader',
        options: {
          sourceMap: true
        }
      }, {
        loader: 'sass-loader',
        options: {
          outputStyle: 'expanded',
          sourceMap: true
        }
      }
    ])
  ]
};

if (process.env.WEBPACK_DLLS === '1' && validDLLs) {
  helpers.installVendorDLL(webpackConfig, 'vendor');
}
