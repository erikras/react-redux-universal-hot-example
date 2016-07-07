var path = require('path');
var projectRootPath = path.resolve(__dirname, '../');
var webpack = require('webpack');
var HappyPack = require('happypack');
var happyThreadPool = HappyPack.ThreadPool({ size: 5 });

module.exports = {
  createSourceLoader: createSourceLoader,
  createHappyPlugin: createHappyPlugin,
  installVendorDLL: installVendorDLL
};

// restrict loader to files under /src
function createSourceLoader(spec) {
  return Object.keys(spec).reduce(function (x, key) {
    x[key] = spec[key];

    return x;
  }, {
    include: [path.resolve(__dirname, '../src')]
  });
}

function createHappyPlugin(id) {
  return new HappyPack({
    id: id,
    threadPool: happyThreadPool,

    // disable happypack with HAPPY=0
    enabled: process.env.HAPPY !== '0',

    // disable happypack caching with HAPPY_CACHE=0
    cache: process.env.HAPPY_CACHE !== '0',

    // make happypack more verbose with HAPPY_VERBOSE=1
    verbose: process.env.HAPPY_VERBOSE === '1',
  });
}

function installVendorDLL(config, dllName) {
  if (process.env.WEBPACK_DLLS === '1') {
    var manifest = loadDLLManifest(path.join(projectRootPath, `webpack/dlls/${dllName}.json`));

    if (manifest) {
      console.warn(`Webpack: will be using the ${dllName} DLL.`);

      config.plugins.push(new webpack.DllReferencePlugin({
        context: projectRootPath,
        manifest: manifest
      }));
    }
  }
};

function loadDLLManifest(filePath) {
  try {
    return require(filePath);
  }
  catch (e) {
    process.env.WEBPACK_DLLS = '0';

    console.error(`========================================================================
  Environment Error
------------------------------------------------------------------------
You have requested to use webpack DLLs (env var WEBPACK_DLLS=1) but a
manifest could not be found. This likely means you have forgotten to
build the DLLs.
You can do that by running:
    npm run build-dlls
The request to use DLLs for this build will be ignored.`);
  }

  return undefined;
}