require('babel/polyfill');

const defaults = {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT,
    apiHost: process.env.APIHOST || 'localhost',
    apiPort: process.env.APIPORT,
    app: {
        title: 'React Redux Example',
        description: 'All the modern best practices in one example.',
        meta: {
            charSet: 'utf-8'
        }
    }
};

const extra = {
    isProduction: process.env.NODE_ENV == 'production'
};

module.exports = Object.assign({}, defaults, extra);
