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
          {
            test: /\.less$/,
            loader: 'style-loader!css-loader?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!postcss-loader!less-loader?outputStyle=expanded&sourceMap'
          },
          {
            test: /\.scss$/,
            loader: 'style-loader!css-loader?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!postcss-loader!sass-loader?outputStyle=expanded&sourceMap'
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
        new webpack.IgnorePlugin(/\.json$/),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
          __CLIENT__: true,
          __SERVER__: false,
          __DEVELOPMENT__: true,
          __DEVTOOLS__: false,  // <-------- DISABLE redux-devtools HERE
          __DLLS__: false
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
