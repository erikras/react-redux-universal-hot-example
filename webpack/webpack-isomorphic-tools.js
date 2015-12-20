var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');

// see this link for more info on what all of this means
// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
module.exports = {

  // when adding "js" extension to asset types
  // and then enabling debug mode, it may cause a weird error:
  //
  // [0] npm run start-prod exited with code 1
  // Sending SIGTERM to other processes..
  //
  // debug: true,

  assets: {
    images: {
      extensions: [
        'jpeg',
        'jpg',
        'png',
        'gif'
      ],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser
    },
    fonts: {
      extensions: [
        'woff',
        'woff2',
        'ttf',
        'eot'
      ],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser
    },
    svg: {
      extension: 'svg',
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser
    },
    bootstrap: {
      extension: 'js',
      include: ['./src/theme/bootstrap.config.js'],
      filter: function(module, regex, options, log) {
        function is_bootstrap_style(name) {
          return name.indexOf('./src/theme/bootstrap.config.js') >= 0;
        }
      },

      path: WebpackIsomorphicToolsPlugin.style_loader_path_extractor,
      parser: WebpackIsomorphicToolsPlugin.css_loader_parser
    },
    style_modules: {
      extensions: ['less','scss'],
      filter: function(module, regex, options, log) {
        // so the module.name will be equal to the asset path
        return regex.test(module.name);
      },
      path: function(module, options, log) {
        // so the module.name will be equal to the asset path
        return module.name;
      },
      parser: function(module, options, log) {
        // Extract Text Loader which extracts CSS text away
        return module.source;
      }
    }
  }
}
