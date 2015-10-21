var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');

// see this link for more info on what all of this means
// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
module.exports = {
  webpack_assets_file_path: 'webpack-stats.json',

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
    svg: {
      extension: 'svg',
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser
    },
    style_modules: {
      extensions: ['less','scss'],
      filter: function(m, regex, options, log) {
        if (!options.development) {
          return regex.test(m.name);
        }
        //filter by modules with '.scss' inside name string, that also have name and moduleName that end with 'ss'(allows for css, less, sass, and scss extensions)
        //this ensures that the proper scss module is returned, so that namePrefix variable is no longer needed
        return (regex.test(m.name) && m.name.slice(-2) === 'ss' && m.reasons[0].moduleName.slice(-2) === 'ss');
      },
      naming: function(m, options, log) {
        //find index of '/src' inside the module name, slice it and resolve path
        var srcIndex = m.name.indexOf('/src');
        var name = '.' + m.name.slice(srcIndex);
        if (name) {
          // Resolve the e.g.: "C:\"  issue on windows
          const i = name.indexOf(':');
          if (i >= 0) {
            name = name.slice(i + 1);
          }
        }
        return name;
      },
      parser: function(m, options, log) {
        if (m.source) {
          var regex = options.development ? /exports\.locals = ((.|\n)+);/ : /module\.exports = ((.|\n)+);/;
          var match = m.source.match(regex);
          return match ? JSON.parse(match[1]) : {};
        }
      }
    }
  }
}
