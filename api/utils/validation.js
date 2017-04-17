import isPromise from 'is-promise';
import * as validation from '../../src/utils/validation';

function createAsyncValidator(rules, params) {
  return (data = {}) => {
    const errors = validation.createValidator(rules, params)(data);

    const promises = Object.keys(errors)
      .map(name => {
        const error = errors[name];
        const myResolve = () => ({ status: 'resolved', name });
        const myReject = err => ({ status: 'rejected', name, error: err });

        if (isPromise(error)) {
          return error.then(myResolve).catch(myReject);
        }

        return error ? myReject() : myResolve();
      });

    return Promise.all(promises)
      .then(results => {
        const finalErrors = results
          .filter(x => x.status === 'rejected')
          .reduce((prev, next) => ({ ...prev, [next.name]: next.error }), {});

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
  createAsyncValidator
};
