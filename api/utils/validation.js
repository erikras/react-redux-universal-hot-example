import isPromise from 'is-promise';
import * as validation from '../../src/utils/validation';

function createValidatorPromise(rules, params) {
  return (data = {}) => {
    const errors = validation.createValidator(rules, params)(data);

    const myResolve = key => value => ({ value, status: 'resolved', key });
    const myReject = key => err => ({ err, status: 'rejected', key });

    return Promise.all(Object.keys(errors)
      .map(error => (isPromise(errors[error]) ?
        errors[error].then(myResolve(error)).catch(myReject(error)) :
        myReject(error)(errors[error]))))
      .then(results => {
        const ret = {};
        results.filter(x => x.status === 'rejected').map(x => {
          ret[x.key] = x.err;
          return x;
        });
        return Object.keys(ret).length ? Promise.reject(ret) : Promise.resolve(data);
      });
  };
}

function unique(field) {
  return (value, data, { service }) => service.find({ query: { [field]: value } })
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
