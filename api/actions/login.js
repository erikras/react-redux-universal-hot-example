export default function login(req) {
  const user = {
    name: req.body.name
  };
  req.session.user = user; // eslint-disable-line no-param-reassign
  return Promise.resolve(user);
}
