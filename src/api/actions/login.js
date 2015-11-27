export default function login(req) {
  const user = {
    name: req.body.name
  };
  req.session.user = user;
  return Promise.resolve(user);
}
