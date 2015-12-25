const UNAUTHORIZED_USER = 'noaccess';

export default function login(req) {
  const user = {
    name: req.body.name
  };

  if (user.name === UNAUTHORIZED_USER) {
    return Promise.reject({
      status: 401,
      message: 'Unauthorized!'
    });
  }

  req.session.user = user;
  return Promise.resolve(user);
}
