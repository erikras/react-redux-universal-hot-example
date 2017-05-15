import { discard, iff, isProvider } from 'feathers-hooks-common';
import auth from 'feathers-authentication';
import local from 'feathers-authentication-local';
import { restrictToOwner } from 'feathers-authentication-hooks';
import errors from 'feathers-errors';
import { validateHook } from 'hooks';
import { required, email, match, unique } from 'utils/validation';

const schemaValidator = {
  email: [required, email, unique('email')],
  password: required,
  password_confirmation: [required, match('password')]
};

function validate() {
  return hook => {
    if (hook.data.facebook && !hook.data.email) {
      throw new errors.BadRequest('Incomplete oauth registration', hook.data);
    }
    return validateHook(schemaValidator)(hook);
  };
}

const userHooks = {
  before: {
    find: auth.hooks.authenticate('jwt'),
    get: auth.hooks.authenticate('jwt'),
    create: [
      validate(),
      discard('password_confirmation'),
      local.hooks.hashPassword()
    ],
    update: [
      auth.hooks.authenticate('jwt'),
      restrictToOwner({ ownerField: '_id' })
    ],
    patch: [
      auth.hooks.authenticate('jwt'),
      restrictToOwner({ ownerField: '_id' })
    ],
    remove: [
      auth.hooks.authenticate('jwt'),
      restrictToOwner({ ownerField: '_id' })
    ]
  },
  after: {
    all: iff(isProvider('external'), discard('password')),
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

export default userHooks;
