var path = require('path');
var root = path.resolve(__dirname, '..');
var webpack = require('webpack');

exports.installVendorDLL = function(config, dllName) {
  // DLL shizzle. Read more about this in /webpack/dlls/README.md
  if (process.env.WEBPACK_DLLS === '1') {
    var manifest = loadDLLManifest(path.join(root, 'webpack/dlls/manifests/' + dllName + '.json'));

    if (manifest) {
      console.warn('Webpack: will be using the "%s" DLL.', dllName);

      config.plugins.push(new webpack.DllReferencePlugin({
        context: root,
        manifest: manifest
      }));
    }
  }
};

function loadDLLManifest(filePath) {
  try {
    return require(filePath);
  }
  catch(e) {
    process.env.WEBPACK_DLLS = '0';

    console.error(
      function() {/*
        ========================================================================
        Environment Error
        ------------------------------------------------------------------------
        You have requested to use webpack DLLs (env var WEBPACK_DLLS=1) but a
        manifest could not be found. This likely means you have forgotten to
        build the DLLs.

        You can do that by running:

            npm run build-dlls

        The request to use DLLs for this build will be ignored.
      */}.toString().slice(15,-4)
    );
  }

  return undefined;
}
