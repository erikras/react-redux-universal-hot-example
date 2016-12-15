const ONE_DAY = 60 * 60 * 24 * 1000;

module.exports = {
  auth: {
    secret: 'super secret',
    cookie: {
      enabled: true,
      httpOnly: false,
      maxAge: ONE_DAY,
      secure: process.env.NODE_ENV === 'production'
    },
    facebook: {
      path: '/auth/facebook',
      clientID: '635147529978862',
      clientSecret: '28c16a4effa4a5f1371924e4dd12c8cd',
      permissions: {
        authType: 'rerequest'
      },
      scope: ['public_profile', 'email'],
      profileFields: ['id', 'displayName', 'photos', 'email', 'first_name', 'last_name', 'age_range'],
      accessTokenField: 'accessToken'
    }
  }
};
