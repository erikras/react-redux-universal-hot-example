const ONE_DAY = 60 * 60 * 24 * 1000;

module.exports = {
  secret: 's*cr*tK*y',
  auth: {
    user: {
      idField: 'id'
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
    }
  }
};
