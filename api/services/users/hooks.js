import hooks from 'feathers-hooks';
import { hooks as auth } from 'feathers-authentication';
import { validateHook } from '../../hooks';
import { required, email, match, unique } from '../../utils/validation';

const schemaValidator = {
  email: [required, email, unique('email')],
  password: [required],
  password_confirmation: [required, match('password')]
};

function validate() {
  return function (hook) { // eslint-disable-line func-names
    if (hook.data.facebook) {
      hook.data.email = hook.data.facebook.email;
      return hook;
    }
    return validateHook(schemaValidator).bind(this)(hook);
  };
}

const userHooks = {
  before: {
    all: [],
    find: [
      auth.verifyToken(),
      auth.populateUser(),
      auth.restrictToAuthenticated()
    ],
    get: [
      auth.verifyToken(),
      auth.populateUser(),
      auth.restrictToAuthenticated(),
      auth.restrictToOwner({ ownerField: 'id' })
    ],
    create: [
      validate(),
      hooks.remove('password_confirmation'),
      auth.hashPassword()
    ],
    update: [
      auth.verifyToken(),
      auth.populateUser(),
      auth.restrictToAuthenticated(),
      auth.restrictToOwner({ ownerField: 'id' })
    ],
    patch: [
      auth.verifyToken(),
      auth.populateUser(),
      auth.restrictToAuthenticated(),
      auth.restrictToOwner({ ownerField: 'id' })
    ],
    remove: [
      auth.verifyToken(),
      auth.populateUser(),
      auth.restrictToAuthenticated(),
      auth.restrictToOwner({ ownerField: 'id' })
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
