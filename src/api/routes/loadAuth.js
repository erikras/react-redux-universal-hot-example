export default function(req) {
  return Promise.resolve(req.session.user || null);
}
