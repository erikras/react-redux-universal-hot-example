require('babel-core/polyfill');

const environment = {
  development: {
    isProduction: false,
    apiServer: 'http://explore-msd-api-production.elasticbeanstalk.com'
  },
  production: {
    isProduction: true,
    apiServer: 'http://explore-msd-api-production.elasticbeanstalk.com'
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  port: process.env.PORT,
  apiPort: process.env.APIPORT,
  apiPath: '/api',
  app: {
    title: 'Explore the Melbourne School of Design',
    description: 'Find out what makes the MSD unique in both the design and higher education landscapes.',
    meta: {
      charSet: 'utf-8',
      property: {
        'og:site_name': 'Explore the Melbourne School of Design',
        'og:image': '',
        'og:locale': 'en_US',
        'og:title': 'Explore the Melbourne School of Design',
        'og:description': 'Find out what makes the MSD unique in both the design and higher education landscapes.',
        'twitter:card': 'summary',
        'twitter:site': '@msdsocial',
        'twitter:creator': '@msdsocial',
        'twitter:title': 'Explore the Melbourne School of Design',
        'twitter:description': 'Find out what makes the MSD unique in both the design and higher education landscapes.',
        'twitter:image': '',
        'twitter:image:width': '200',
        'twitter:image:height': '200'
      }
    }
  }
}, environment);
