// require('babel-polyfill');

// Webpack config for creating the production bundle.
var path = require('path');
var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var strip = require('strip-loader');

var projectRootPath = path.resolve(__dirname, '../');
var assetsPath = path.resolve(projectRootPath, './static/dist');

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

var SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    main: [
      'bootstrap-loader',
      'font-awesome-webpack!./src/theme/font-awesome.config.prod.js',
      './src/client.js'
    ]
  },
  output: {
    path: assetsPath,
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/dist/'
  },
  performance: {
    hints: false
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [{
          loader: 'strip-loader',
          options: {
            strip: ['debug']
          }
        }, {
          loader: 'babel-loader'
        }],
        exclude: /node_modules/
      }, {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: [
            {
              loader: 'css-loader',
              query: {
                modules: true,
                importLoaders: 2,
                sourceMap: true
              }
            }, {
              loader: 'autoprefixer-loader',
              query: {
                browsers: 'last 2 version'
              }
            }, {
              loader: 'less-loader',
              query: {
                outputStyle: 'expanded',
                sourceMap: true,
                sourceMapContents: true
              }
            }
          ]
        })
      }, {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: [
            {
              loader: 'css-loader',
              query: {
                modules: true,
                importLoaders: 2,
                sourceMap: true
              }
            }, {
              loader: 'autoprefixer-loader',
              query: {
                browsers: 'last 2 version'
              }
            }, {
              loader: 'sass-loader',
              query: {
                outputStyle: 'expanded',
                sourceMap: true,
                sourceMapContents: true
              }
            }
          ]
        })
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
    new CleanPlugin([assetsPath, 'static/service-worker.js'], { root: projectRootPath }),

    // css files from the extract-text-plugin loader
    new ExtractTextPlugin({
      filename: '[name]-[chunkhash].css',
      // disable: false,
      allChunks: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',

      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false,
      __DLLS__: false
    }),

    // ignore dev config
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

    // optimizations
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),

    webpackIsomorphicToolsPlugin,

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/pwa.js'
    }),

    new SWPrecacheWebpackPlugin({
      cacheId: 'react-redux-universal-hot-example',
      filename: '../service-worker.js',
      maximumFileSizeToCacheInBytes: 8388608,

      // Ensure all our static, local assets are cached.
      staticFileGlobs: [path.dirname(assetsPath) + '/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff,woff2}'],
      stripPrefix: assetsPath + '/',

      directoryIndex: '/',
      verbose: true,
      navigateFallback: '/dist/index.html',
      runtimeCaching: [{
        urlPattern: /\/api\/widget\/load(.*)/,
        handler: 'networkFirst',
        options: {
          debug: true
        }
      }]
    })
  ]
};
