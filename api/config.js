module.exports = {
  secret: 's*cr*tK*y',
  auth: {
    user: {
      idField: 'id'
    },
    local: {
      successHandler: () => (req, res, next) => next // for rest login, pass redirection
    },
    token: {
      secret: 'super secret'
    },
    cookies: {
      enable: true
    }
  }
};
