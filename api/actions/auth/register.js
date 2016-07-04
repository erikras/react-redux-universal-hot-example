import { createValidatorPromise as createValidator, required, email, match } from '../../utils/validation';

export default function register(req) {
  return new Promise((resolve, reject) => {
    createValidator({
      email: [required, email],
      password: [required],
      password_confirmation: [required, match('password')]
    })({
      email: req.body.email,
      password: req.body.password,
      password_confirmation: req.body.password_confirmation
    })
    .catch(err => reject(err));

  });
}
