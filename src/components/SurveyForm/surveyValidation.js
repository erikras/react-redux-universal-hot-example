import memoize from 'lru-memoize';
import { createValidator, required, maxLength, email } from 'utils/validation';

const surveyValidation = createValidator({
  name: [required, maxLength(10)],
  email: [required, email],
  occupation: maxLength(20) // single rules don't have to be in an array
});
export default memoize(10)(surveyValidation);
