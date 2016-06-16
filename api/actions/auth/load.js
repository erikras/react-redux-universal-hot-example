export default function load(req) {
  return Promise.resolve(req.session.user || null);
}
