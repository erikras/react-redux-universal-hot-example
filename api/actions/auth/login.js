import { createValidatorPromise as createValidator, required, email } from '../../utils/validation';

export default function login(req) {
  return new Promise((resolve, reject) => {
    createValidator({
      email: [required, email],
      password: [required]
    })({
      email: req.body.email,
      password: req.body.password
    })
    .catch(err => reject(err));
  });
}
