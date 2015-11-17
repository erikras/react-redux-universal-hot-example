require('babel-core/polyfill');

const environment = {
  development: {
    isProduction: false,
    apiServer: 'http://api.explore.msd.unimelb.edu.au'
  },
  production: {
    isProduction: true,
    apiServer: 'http://api.explore.msd.unimelb.edu.au'
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
        'og:image': 'http://explore.msd.unimelb.edu.au/explore_msd_logo.jpg',
        'og:locale': 'en_US',
        'og:title': 'Explore the Melbourne School of Design',
        'og:description': 'A living learning building, the Melbourne School of Design sets a new standard for design education in the Asia-Pacific region.',
        'twitter:card': 'summary_large_image',
        'twitter:site': '@msdsocial',
        'twitter:creator': '@msdsocial',
        'twitter:title': 'Explore the Melbourne School of Design',
        'twitter:description': 'A living learning building, the Melbourne School of Design sets a new standard for design education in the Asia-Pacific region.',
        'twitter:image': 'http://explore.msd.unimelb.edu.au/explore_msd_logo.jpg',
        'twitter:image:width': '1200',
        'twitter:image:height': '630'
      }
    }
  }
}, environment);
