export default function load(req) {
  const { token, user } = req;

  return {
    user: user ? Object.assign({}, user, { password: undefined }) : null,
    token: token || null
  };
}
