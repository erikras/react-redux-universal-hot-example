const environment = {
  development: {
    isProduction: false,
    assetsPath: `http://${process.env.HOST || 'localhost'}:${+process.env.PORT + 1 || 3001}/dist/`
  },
  production: {
    isProduction: true,
    assetsPath: '/dist/'
  }
}[process.env.NODE_ENV || 'development'];

//Remember that server differ to client....
// console.log(! (typeof window != 'undefined' && window.document)); is_server
const is_on_server = !(typeof window != 'undefined' && window.document);

module.exports = Object.assign(
  {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT,
    apiHost: process.env.APIHOST || 'localhost',
    apiPort: process.env.APIPORT,
    oneApiHost: is_on_server ? process.env.ONE_API_HOST : process.env.ONE_API_HOST, //'oneapi.hochochoc.local' , //docker: server-only
    oneApiPort: is_on_server ? process.env.ONE_API_PORT: 80,
    // authHost: 'auth.hochochoc.local/login?service=',
    authHost: is_on_server ? 'oneauth/login?service=' : process.env.AUTH_HOST,//'auth.hochochoc.local/login?service=', //client only???
    redis_db: 'redis_db',
    app: {
      title: 'Học Học Học',
      description: 'Học Học Học ^_^',
      head: {
        titleTemplate: 'Học Học Học: %s',
        meta: [
          { name: 'description', content: 'Cùng nhau học tập nhé!' },
          { charset: 'utf-8' },
          { property: 'og:site_name', content: 'Luyện Thi Quốc Gia' },
          { property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg' },
          { property: 'og:locale', content: 'en_US' },
          { property: 'og:title', content: 'Luyện Thi Quốc Gia' },
          { property: 'og:description', content: 'Cùng nhau học tập nhé' },
          { property: 'og:card', content: 'summary' },
          { property: 'og:site', content: '@haotrananh' },
          { property: 'og:creator', content: '@haotrananh' },
          { property: 'og:image:width', content: '200' },
          { property: 'og:image:height', content: '200' }
        ]
      }
    }
  },
  environment
);
