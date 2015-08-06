var fs = require('fs'),
  path = require('path'),
  filepath = path.resolve(__dirname, '../../webpack-stats.json');

module.exports = function writeStats(stats, env) {

  var publicPath = this.options.output.publicPath;

  var json = stats.toJson();

  // get chunks by name and extensions
  function getChunks(name, ext) {
    ext = ext || 'js';
    var chunk = json.assetsByChunkName[name];

    // a chunk could be a string or an array, so make sure it is an array
    if (!(Array.isArray(chunk))) {
      chunk = [chunk];
    }

    return chunk
      // filter by extension
      .filter(function(chunkName) {
        return path.extname(chunkName) === '.' + ext;
      })
      .map(function(chunkName) {
        return publicPath + chunkName;
      });
  }

  var script = getChunks('main', 'js');
  var cssFiles = getChunks('main', 'css');

  var cssModules = {};

  json.modules.filter(function(m) {
    if (env === 'prod') {
      return /\.scss$/.test(m.name);
    }
    //filter by modules with '.scss' inside name string, that also have name and moduleName that end with 'ss'(allows for css, less, sass, and scss extensions)
    //this ensures that the proper scss module is returned, so that namePrefix variable is no longer needed
    return (/\.scss$/.test(m.name) && m.name.slice(-2) === 'ss' && m.reasons[0].moduleName.slice(-2) === 'ss');
  }).forEach(function(m) {
    //find index of '/src' inside the module name, slice it and resolve path
    var srcIndex = m.name.indexOf('/src');
    var name = path.resolve(__dirname, '../../', m.name.slice(srcIndex + '/src'.length));
    if (name) {
      // Resolve the e.g.: "C:\"  issue on windows
      const i = name.indexOf(':');
      if (i >= 0) {
        name = name.slice(i + 1);
      }
    }
    //end
    if (m.source) {
      var regex = env === 'prod' ? /module\.exports = ((.|\n)+);/ : /exports\.locals = ((.|\n)+);/;
      var match = m.source.match(regex);
      cssModules[name] = match ? JSON.parse(match[1]) : {};
    }
  });

  // Find compiled images in modules
  // it will be used to map original filename to the compiled one
  // for server side rendering
  const imagesRegex = /\.(jpe?g|png|gif|svg)$/;
  const images = json.modules
    .filter(function(module) {
      return imagesRegex.test(module.name);
    })
    .map(function(image) {
    var i = image.source.indexOf('"');
    var imageSource = image.source.slice(i + 1, -1);
    imageSource = imageSource.lastIndexOf('data:image', 0) === 0 ? imageSource : publicPath + imageSource;
      return {
        original: image.name,
        compiled: imageSource
      };
    });

  var content = {
    script: script,
    css: {
      files: cssFiles,
      modules: cssModules
    },
    images: images
  };

  fs.writeFileSync(filepath, JSON.stringify(content));

};
