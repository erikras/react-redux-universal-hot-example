import { Strategy as FacebookStrategy } from 'passport-facebook';
import FacebookTokenStrategy from 'passport-facebook-token';
const ONE_DAY = 60 * 60 * 24 * 1000;

module.exports = {
  secret: 's*cr*tK*y',
  auth: {
    user: {
      idField: '_id'
    },
    local: {
      successHandler: () => (req, res, next) => next // for login with rest provider, pass redirection
    },
    token: {
      secret: 'super secret'
    },
    cookies: {
      enable: true,
      'feathers-session': { // set to false to disable this cookie
        httpOnly: true,
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
      clientID: '619121718248110',
      clientSecret: '765220c3e424174af8fb691a37c0b8f4',
      permissions: {
        authType: 'rerequest',
        scope: ['public_profile', 'email']
      },
      profileFields: ['id', 'displayName', 'photos', 'email', 'first_name', 'last_name', 'age_range'],
      accessTokenField: 'accessToken'
    }
  }
};
