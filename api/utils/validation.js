import * as validation from '../../src/utils/validation';

function createValidatorPromise(rules) {
  return (data = {}) => {
    const errors = validation.createValidator(rules)(data);
    return Object.keys(errors).length ? Promise.reject(errors) : Promise.resolve(data);
  };
}

module.exports = {
  ...validation,
  createValidatorPromise
};
