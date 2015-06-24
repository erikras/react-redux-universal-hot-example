var fs = require('fs'),
  path = require('path'),
  filepath = path.resolve(__dirname, '../../webpack-stats.json');

module.exports = function writeStats(stats) {

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
      .filter(function (chunkName) {
        return path.extname(chunkName) === '.' + ext;
      })
      .map(function (chunkName) {
        return publicPath + chunkName;
      });
  }

  var script = getChunks('main', 'js');
  var css = getChunks('main', 'css');

  var content = {
    script: script,
    css: css
  };

  fs.writeFileSync(filepath, JSON.stringify(content));

};
