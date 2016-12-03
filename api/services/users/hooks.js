import hooks from 'feathers-hooks-common';
import { hooks as auth } from 'feathers-authentication';
import errors from 'feathers-errors';
import { validateHook, restrictToOwner } from '../../hooks';
import { required, email, match, unique } from '../../utils/validation';

const schemaValidator = {
  email: [required, email, unique('email')],
  password: [required],
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
    all: [],
    find: [
      auth.isAuthenticated()
    ],
    get: [
      auth.isAuthenticated()
    ],
    create: [
      validate(),
      hooks.remove('password_confirmation'),
      auth.hashPassword()
    ],
    update: [
      auth.isAuthenticated(),
      restrictToOwner({ ownerField: '_id' })
    ],
    patch: [
      auth.isAuthenticated(),
      restrictToOwner({ ownerField: '_id' })
    ],
    remove: [
      auth.isAuthenticated(),
      restrictToOwner({ ownerField: '_id' })
    ]
  },
  after: {
    all: [hooks.remove('password')],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

export default userHooks;
