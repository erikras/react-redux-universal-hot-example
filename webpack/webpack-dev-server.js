var Express = require('express');
var browserSync = require('browser-sync');
var webpack = require('webpack');

var config = require('../src/config');
var webpackConfig = require('./dev.config');
var compiler = webpack(webpackConfig);

var host = config.host;
var webpackPort = (config.port + 2) || 3002;
var browserSyncPort = config.port || 3000;
var serverOptions = {
  contentBase: 'http://' + host + ':' + webpackPort,
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  headers: {'Access-Control-Allow-Origin': '*'},
  stats: {colors: true}
};

var app = new Express();
var webpackDevMiddleware = require('webpack-dev-middleware')(compiler, serverOptions);
var webpackHotMiddleware = require('webpack-hot-middleware')(compiler);
app.use(webpackDevMiddleware);
app.use(webpackHotMiddleware);

app.listen(webpackPort, function onAppListening(err) {
  if (err) {
    console.error(err);
  } else {
    console.info('==> 🚧  Webpack development server listening on port %s', webpackPort);
    browserSync({
      ui: false,
      ghostMode: false,
      online: false,
      open: false,
      notify: false,
      host: host,
      port: browserSyncPort,
      xip: false,
      tunnel: true,
      proxy: {
        target: host + ':' + (browserSyncPort + 1),
        middleware: [
          webpackDevMiddleware,
          webpackHotMiddleware
        ]
      },
      files: [
        './static/dist/*.css'
      ]
    });
  }
});

