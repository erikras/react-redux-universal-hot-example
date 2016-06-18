var path = require('path');
var webpack = require('webpack');
var root = path.resolve(__dirname, '..', '..', '..');

module.exports = {
  devtool: process.env.NODE_ENV === 'production' ? null : 'inline-source-map',

  output: {
    path: path.join(root, 'static/dist/dlls'),
    filename: 'dll__[name].js',
    library: 'DLL_[name]_[hash]'
  },

  entry: {
    vendor: [
      'babel-polyfill',

      // <babel-runtime>
      //
      // Generate this list using the following command against the stdout of
      // webpack running against the source bundle config (dev/prod.js):
      //
      //     egrep -o 'babel-runtime/\S+' | sed 's/\.js$//' | sort | uniq | wc -l
      'babel-runtime/core-js/array/from',
      'babel-runtime/core-js/get-iterator',
      'babel-runtime/core-js/is-iterable',
      'babel-runtime/core-js/json/stringify',
      'babel-runtime/core-js/number/is-integer',
      'babel-runtime/core-js/number/is-safe-integer',
      'babel-runtime/core-js/object/define-property',
      'babel-runtime/core-js/object/get-own-property-descriptor',
      'babel-runtime/core-js/object/get-own-property-names',
      'babel-runtime/core-js/object/get-prototype-of',
      'babel-runtime/core-js/promise',
      'babel-runtime/helpers/create-class',
      'babel-runtime/helpers/createClass',
      'babel-runtime/helpers/defineProperty',
      'babel-runtime/helpers/get',
      'babel-runtime/helpers/possibleConstructorReturn',
      'babel-runtime/helpers/slicedToArray',
      'babel-runtime/helpers/to-consumable-array',
      'babel-runtime/helpers/toConsumableArray',
      // </babel-runtime>

      'invariant',
      'multireducer',
      'react',
      'react-bootstrap',
      'react-dom',
      'react-helmet',
      'react-inline-css',
      'react-redux',
      'react-router',
      'react-router-bootstrap',
      'react-router-redux',
      'redux',
      'redux-async-connect',
      'redux-form',
      'scroll-behavior',
      'serialize-javascript',
      'socket.io-client',
      'superagent',
      'warning',
    ]
  },

  resolve: {
    root: path.resolve(root, 'node_modules'),
    extensions: [ '', '.js' ],
    postfixes: [],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),

    new webpack.DllPlugin({
      path: path.join(root, 'webpack/dlls/manifests/[name].json'),
      name: 'DLL_[name]_[hash]'
    })
  ]
};
