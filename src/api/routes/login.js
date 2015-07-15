export default function(req) {
  console.info('body', req.body);
  const user = {
    name: req.body.name
  };
  req.session.user = user;
  return Promise.resolve(user);
}
