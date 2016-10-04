import { Strategy as FacebookStrategy } from 'passport-facebook';
import FacebookTokenStrategy from 'passport-facebook-token';
const ONE_DAY = 60 * 60 * 24 * 1000;

module.exports = {
  secret: 's*cr*tK*y',
  auth: {
    setupMiddleware: false,
    user: {
      idField: '_id'
    },
    local: {
      successHandler: () => (req, res) => res.json(res.data)
    },
    token: {
      secret: 'super secret'
    },
    cookies: {
      enable: true,
      'feathers-session': { // set to false to disable this cookie
        httpOnly: false,
        maxAge: ONE_DAY,
        secure: process.env.NODE_ENV === 'production'
      }
    },
    facebook: {
      idField: '_id',
      provider: 'facebook',
      endpoint: '/auth/facebook',
      strategy: FacebookStrategy,
      tokenStrategy: FacebookTokenStrategy,
      clientID: '635147529978862',
      clientSecret: '28c16a4effa4a5f1371924e4dd12c8cd',
      permissions: {
        authType: 'rerequest',
        scope: ['public_profile', 'email']
      },
      profileFields: ['id', 'displayName', 'photos', 'email', 'first_name', 'last_name', 'age_range'],
      accessTokenField: 'accessToken'
    }
  }
};
