export default function load(req) {
  const { token, user } = req;

  return {
    user: user ? { ...user, password: undefined } : null,
    token: token || null
  };
}
