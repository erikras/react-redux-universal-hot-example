import { createValidatorPromise as validator } from '../utils/validation';
import errors from 'feathers-errors';

export function validateHook(schema) {
  return hook => validator(schema, { service: this, hook })(hook.data)
    .then(() => hook)
    .catch(errorsValidation => {
      if (Object.keys(errorsValidation).length) {
        throw new errors.BadRequest('Validation failed', errorsValidation);
      }
    });
}
