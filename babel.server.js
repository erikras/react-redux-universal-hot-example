require('babel/register')({
	stage: 0,
	plugins: ['typecheck']
});

/**
 * Define isomorphic constants.
 */
global.__CLIENT__ = false;
global.__SERVER__ = true;

if (process.env.NODE_ENV !== 'production') {
	if (!require('piping')({hook: true})) {
		return;
	}
}

require('./src/server');
