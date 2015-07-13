var WebpackDevServer = require('webpack-dev-server'),
  webpack = require('webpack'),
  config = require('./dev.config'),
  host = process.env.HOST || 'localhost',
  port = parseInt(process.env.PORT) + 1 || 3001,
  serverOptions = {
    contentBase: 'http://' + host + ':' + port,
    quiet: true,
    noInfo: true,
    hot: true,
    inline: true,
    lazy: false,
    publicPath: config.browser.output.publicPath,
    headers: {"Access-Control-Allow-Origin": "*"},
    stats: {colors: true}
  },
  browserCompiler = webpack(config.browser),
  webpackDevServer = new WebpackDevServer(browserCompiler, serverOptions);

var serverCompiler = webpack(config.server);
serverCompiler.run(function(err) {
  if (err) {
    throw err;
  }
});

webpackDevServer.listen(port, host, function() {
  console.info('==> 🚧  Webpack development server listening on %s:%s', host, port);
});
