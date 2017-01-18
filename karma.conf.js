var webpack = require('webpack');

module.exports = function (config) {
  config.set({

    browsers: ['PhantomJS'],

    singleRun: !!process.env.CI,

    frameworks: ['mocha'],

    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      process.env.WEBPACK_DLLS === '1' && './static/dist/dlls/dll__vendor.js',
      'tests.webpack.js'
    ].filter(function (x) { return !!x; }),

    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap']
    },

    reporters: ['mocha'],

    plugins: [
      require("karma-webpack"),
      require("karma-mocha"),
      require("karma-mocha-reporter"),
      require("karma-phantomjs-launcher"),
      require("karma-sourcemap-loader")
    ],

    webpack: {
      devtool: 'inline-source-map',
      entry: '',
      performance: {
        hints: false
      },
      module: {
        rules: [
          { test: /\.(jpe?g|png|gif|svg)$/, loader: 'url', options: { limit: 10240 } },
          { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
          { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
          {
            test: /\.scss$/,
            loader: 'style-loader!css-loader?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer-loader?browsers=last 2 version!sass-loader?outputStyle=expanded&sourceMap'
          }
        ]
      },
      resolve: {
        modules: [
          'src',
          'node_modules'
        ]
      },
      plugins: [
        new webpack.IgnorePlugin(/\.json$/),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
          __CLIENT__: true,
          __SERVER__: false,
          __DEVELOPMENT__: true,
          __DEVTOOLS__: false,  // <-------- DISABLE redux-devtools HERE
          __DLLS__: process.env.WEBPACK_DLLS === '1'
        })
      ]
    },

    webpackServer: {
      noInfo: true
    },

    devServer: {
      stats: 'errors-only',
    }

  });
};
