import passport from 'passport';
import passportJwt from 'passport-jwt';

const { ExtractJwt, Strategy } = passportJwt;

export function initialize(secret) {
  function tokenExtractor(req) {
    const sessionToken = req.session && req.session.user && req.session.user.token;
    return ExtractJwt.fromAuthHeader()(req) || sessionToken;
  }

  const opts = {
    jwtFromRequest: tokenExtractor,
    secretOrKey: secret
  };

  passport.use(new Strategy(opts, (jwtPayload, done) => {
    /* TODO: Replace get info from user database. */
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    /* TODO: Replace get info from user database. */
  });
}

export function requireLogin(req) {
  return new Promise((resolve, reject) => {
    if (req.session && req.session.user) resolve(req.session.user);

    passport.authenticate('jwt', (err, user) => {
      if (err) reject(err);
      if (!user) reject('Not authorized');
      req.login(user, errLogin => {
        if (errLogin) reject(errLogin);
        resolve(user);
      });
    })(req);
  });
}
