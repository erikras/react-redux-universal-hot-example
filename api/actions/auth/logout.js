import jwt from 'jsonwebtoken';

export default function logout(req) {
  return new Promise(resolve => {
    if (req.session) {
      if (req.session.user) {
        jwt.sign(req.session.user, 'logout', {
          expiresIn: 60 * 60 * 4 // in seconds
        });
      }

      req.session.destroy(() => {
        req.session = null;
        return resolve(null);
      });
    }
  });
}
