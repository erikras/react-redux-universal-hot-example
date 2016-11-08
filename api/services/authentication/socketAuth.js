import async from 'async';
import authMiddleware from 'feathers-authentication/lib/middleware';

export default function socketAuth(app) {
  return (socket, next) => {
    const { cookie } = socket.request.headers;
    const req = {
      app,
      headers: socket.request.headers,
      body: {},
      query: {},
      cookies: cookie && cookie.split('; ').reduce((prev, nextCookie) => {
        const [name, value] = nextCookie.split('=');
        return {
          ...prev,
          [name]: value
        };
      }, {})
    };
    const res = {};

    const { exposeRequestResponse, tokenParser, verifyToken, populateUser } = authMiddleware;

    async.waterfall([
      cb => exposeRequestResponse()(req, res, cb),
      cb => tokenParser(app.get('auth'))(req, res, cb),
      cb => verifyToken(app.get('auth'))(req, res, cb),
      cb => populateUser(app.get('auth'))(req, res, cb)
    ], err => {
      if (err) return next(err);
      socket.feathers.token = req.token;
      socket.feathers.user = req.user;
      socket.feathers.authenticated = !!req.token;
      next();
    });
  };
}
