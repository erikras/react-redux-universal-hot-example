export default function loadAuth(req) {
  return Promise.resolve(req.session.user || null);
}
