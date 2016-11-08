import memoize from 'lru-memoize';
import { createValidator, required, email, match } from 'utils/validation';

const registerValidation = createValidator({
  email: [required, email],
  password: required,
  password_confirmation: [required, match('password')]
});
export default memoize(10)(registerValidation);
