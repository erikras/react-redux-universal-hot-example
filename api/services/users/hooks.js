import hooks from 'feathers-hooks';
import { hooks as auth } from 'feathers-authentication';
import { validateHook, restrictToOwner } from '../../hooks';
import { required, email, match, unique } from '../../utils/validation';
import errors from 'feathers-errors';

const schemaValidator = {
  email: [required, email, unique('email')],
  password: [required],
  password_confirmation: [required, match('password')]
};

function validate() {
  return function (hook) { // eslint-disable-line func-names
    if (hook.data.facebook && !hook.data.email) {
      throw new errors.BadRequest('Incomplete oauth registration', hook.data);
    }
    return validateHook(schemaValidator).bind(this)(hook);
  };
}

const userHooks = {
  before: {
    all: [],
    find: [
      auth.isAuthenticated()
    ],
    get: [
      auth.isAuthenticated(),
      restrictToOwner({ ownerField: 'id' })
    ],
    create: [
      validate(),
      hooks.remove('password_confirmation'),
      auth.hashPassword()
    ],
    update: [
      auth.isAuthenticated(),
      restrictToOwner({ ownerField: 'id' })
    ],
    patch: [
      auth.isAuthenticated(),
      restrictToOwner({ ownerField: 'id' })
    ],
    remove: [
      auth.isAuthenticated(),
      restrictToOwner({ ownerField: 'id' })
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
