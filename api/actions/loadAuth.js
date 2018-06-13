export default function loadAuth(req) {
  console.log("what");
  console.log(req.session);
  return Promise.resolve(req.session.user || null);
}
