module.exports = {
  secret: 's*cr*tK*y',
  auth: {
    user: {
      idField: 'id'
    },
    local: {
      successHandler: (/* authConfig */) => (req, res, next) => {
        delete res.data.user.password;
        next();
      }
    },
    token: {
      secret: 'super secret'
    },
    cookies: {
      enable: true
    }
  }
};
