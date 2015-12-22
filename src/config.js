require('babel/polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

const siteInfo = {
  author: {
    twitter: '@erikras'
  },
  title: 'React Redux Example',
  description: 'All the modern best practices in one example.',
  logo: {
    src: 'https://react-redux.herokuapp.com/logo.jpg',
    height: 200,
    width: 200
  },
  social: {
    twitter: '@erikras'
  }
};

function createMeta(info) {
  return {
    charSet: 'utf-8',
    property: {
      'og:site_name': info.title,
      'og:image': info.logo.src,
      'og:locale': 'en_US',
      'og:title': info.title,
      'og:description': info.description,
      'twitter:card': 'summary',
      'twitter:site': info.social.twitter,
      'twitter:creator': info.author.twitter,
      'twitter:title': info.title,
      'twitter:description': info.description,
      'twitter:image': info.logo.src,
      'twitter:image:width': info.logo.width.toString(),
      'twitter:image:height': info.logo.height.toString()
    },
  };
}
siteInfo.meta = createMeta(siteInfo);

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: siteInfo
}, environment);
