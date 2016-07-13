import { createValidator as validator } from '../utils/validation';
import errors from 'feathers-errors';

export function myHook(options) {
  return hook => {
    console.log('My custom global hook ran. Feathers is awesome!');
  };
};

export function validateHook(schema, options) {
  return hook => {
    const errorsValidation = validator(schema)(hook.data);

    if (Object.keys(errorsValidation).length) {
      throw new errors.BadRequest('Validation failed', errorsValidation);
    }
  }
}
