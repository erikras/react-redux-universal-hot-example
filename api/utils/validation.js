import isPromise from 'is-promise';
import * as validation from '../../src/utils/validation';

function createValidatorPromise(rules, params) { // TODO asyncValidator
  return (data = {}) => {
    const errors = validation.createValidator(rules, params)(data);

    const promises = Object.keys(errors)
      .map(name => {
        const error = errors[name];
        const myResolve = (key, value) => ({ value, status: 'resolved', key });
        const myReject = (key, err) => ({ err, status: 'rejected', key });

        if (isPromise(error)) {
          return error.then(v => myResolve(name, v)).catch(v => myReject(name, v));
        }

        return myReject(name, error);
      });

    return Promise.all(promises)
      .then(results => {
        const finalErrors = results
          .filter(x => x.status === 'rejected')
          .reduce((prev, next) => ({ ...prev, [next.key]: next.err }), {});

        return Object.keys(finalErrors).length ? Promise.reject(finalErrors) : Promise.resolve(data);
      });
  };
}

function unique(field) {
  return (value, data, { hook }) => hook.service.find({ query: { [field]: value } })
    .then(result => {
      if (result.total !== 0) {
        return Promise.reject('Already exist');
      }
    });
}

module.exports = {
  ...validation,
  unique,
  createValidatorPromise
};
