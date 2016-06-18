# DLLs

Webpack "DLLs" can help reduce the build times a bit which is rather useful
during development.

You may opt-in to use the Vendor DLL by doing the following:

- set `WEBPACK_DLLS=1` in your shell before running webpack
- compile the DLL using `npm run build-dlls`

You need to be careful to re-compile the DLL anytime a vendor module changes 
(which is not often.)

## Defining a new DLL

See the `vendor` DLL under `/webpack/dlls/vendor/webpack.config.js` for 
pointers on how to create one. Here are the guidelines:

- the DLL definition goes under `/webpack/dlls/[name]/webpack.config.js`
- the JS bundle goes under `/static/dist/dlls` with the name `dll__[name].js`
- the compiled manifest (auto-generated) goes under `/webpack/dlls/manifests`
  with the name `[name].json`
- a reference to the DLL should be registered in `/webpack/dev.config.js`
- the build script `build-dlls` defined in `package.json` must be adjusted to compile that DLL
- the component `src/helpers/Html.js` should include the JS bundle
- `karma.conf.js` should preload the JS bundle under `files`

## Adding modules to the Vendor DLL

If you add a new dependency that you want to freeze within the DLL, add it
to `/webpack/dlls/vendor/webpack.config.js` under `entry.vendor`.
