export default function login(req) {
  // const user = {
  //   name: req.body.name
  // };
  // req.session.user = user;
  // return Promise.resolve(user);

  console.log('show meeeee');
  console.log(req.body);
  const user = req.body;
  console.log('session');
  console.log(req.session);
  req.session.user = user;
  return Promise.resolve(user);
}
