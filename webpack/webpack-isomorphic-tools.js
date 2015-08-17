var WebpackIsomorphicTools = require('webpack-isomorphic-tools');

// see this link for more info on what all of this means
// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
module.exports = {
  webpack_stats_file_path: 'webpack-stats.json',

  assets: [{
    extensions: [
      'jpeg',
      'jpg',
      'png',
      'gif',
      'svg'
    ],
    loader: 'url-loader?limit=10240', // Any png-image or woff-font below or equal to 10K will be converted to inline base64 instead
    parser: WebpackIsomorphicTools.url_loader_parser
  }, {
    extension: 'scss',
    filter: function(m, regex, options) {
      if (options.environment === 'production') {
        return regex.test(m.name);
      }
      //filter by modules with '.scss' inside name string, that also have name and moduleName that end with 'ss'(allows for css, less, sass, and scss extensions)
      //this ensures that the proper scss module is returned, so that namePrefix variable is no longer needed
      return (regex.test(m.name) && m.name.slice(-2) === 'ss' && m.reasons[0].moduleName.slice(-2) === 'ss');
    },
    naming: function(m) {
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
    parser: function(m, options) {
      if (m.source) {
        var regex = options.environment === 'production' ? /module\.exports = ((.|\n)+);/ : /exports\.locals = ((.|\n)+);/;
        var match = m.source.match(regex);
        return match ? JSON.parse(match[1]) : {};
      }
    }
  }]
}