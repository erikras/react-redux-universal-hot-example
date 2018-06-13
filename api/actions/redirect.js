export default function redirect(req) {
  console.log("hey, redirect????");
  console.log(req.query); //req.query.path
  console.log(process.env.AUTH_HOST + req.query.path);
  // res.redirect(process.env.AUTH_HOST + req.query.path);
  // end();
  return Promise.resolve(process.env.AUTH_HOST + req.query.path);
}
