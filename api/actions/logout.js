export default function logout(req) {
  return new Promise((resolve) => {
    req.session.destroy(() => {
      req.session = null; // eslint-disable-line no-param-reassign
      return resolve(null);
    });
  });
}
