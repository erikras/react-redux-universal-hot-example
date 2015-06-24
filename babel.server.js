require('babel/register')({
  stage: 0,
  plugins: ['typecheck']
});

/**
 * Define isomorphic constants.
 */
global.__CLIENT__ = false;
global.__SERVER__ = true;
delete global.__BROWSER__;

if (process.env.NODE_ENV !== 'production') {
  if (!require('piping')({
      hook: true,
      ignore: /(\/\.|~$|\.json|\.scss$)/i
    })) {
    return;
  }
}

require('./src/server');
