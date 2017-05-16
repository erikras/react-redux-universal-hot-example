export default function socketAuth(app) {
  return (socket, next) => {
    const { cookie } = socket.request.headers;
    const cookies = cookie && cookie.split('; ')
        .reduce((prev, nextCookie) => {
          const [name, value] = nextCookie.split('=');
          return {
            ...prev,
            [name]: value
          };
        }, {});

    const accessToken = cookies && cookies['feathers-jwt'];

    socket._feathers = {}; // TODO remove this when possible...

    if (!accessToken) return next();

    app.passport.verifyJWT(accessToken, app.get('auth'))
      .then(payload => app.service('users').get(payload.userId))
      .then(user => {
        Object.assign(socket.feathers, {
          accessToken,
          user,
          authenticated: true
        });
        next();
      })
      .catch(() => next());
  };
}
