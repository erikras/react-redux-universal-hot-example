'use strict';

let babel = require('babel');
let webpack = require('webpack');
let wallabyWebpack = require('wallaby-webpack');

module.exports = wallaby => {

  let wallabyPostprocessor = wallabyWebpack({

    resolve: {
      modulesDirectories: ['src', 'node_modules'],
      extensions: ['', '.json', '.js']
    },

    plugins: [
      new webpack.DefinePlugin({
        __CLIENT__: true,
        __SERVER__: false,
        __DEVELOPMENT__: true,
        __DEVTOOLS__: false
      }),

      // if you'd like to use real sass loader instead of the mock,
      // then because wallaby.js is using its own node.js version by default,
      // you may need to run:
      // `nvm install 4.2.2` or `nvm use 4.2.2`
      // `npm rebuild node-sass`
      new webpack.NormalModuleReplacementPlugin(/\.scss$/, result => {
        let fs = require('fs');
        let path = require('path');
        let stylesMock = path.join(wallaby.projectCacheDir, 'stylesMock.js');
        fs.writeFileSync(stylesMock, 'module.exports={infoBar: ""}');
        result.request = stylesMock;
      })
    ]
  });

  return {
    files: [
      {pattern: 'node_modules/phantomjs-polyfill/bind-polyfill.js', instrument: false},
      {pattern: 'src/**/*.+(js|json|less|scss)', load: false},
      {pattern: 'src/**/*-test.js', ignore: true}
    ],

    tests: [
      {pattern: 'src/**/*-test.js', load: false}
    ],

    compilers: {
      '**/*.js*': wallaby.compilers.babel({
        babel: babel,
        stage: 0,
        optional: 'runtime',
        loose: 'all'
      })
    },

    postprocessor: wallabyPostprocessor,

    bootstrap: function () {
      window.__moduleBundler.loadTests();
    }
  }
};
