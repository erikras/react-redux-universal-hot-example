import hooks from 'feathers-hooks';
import { hooks as auth } from 'feathers-authentication';
import { validateHook as validate } from '../../hooks';
import { required, email, match } from '../../utils/validation';

const schemaValidator = {
  email: [required, email],
  password: [required],
  password_confirmation: [required, match('password')]
};

function removePasswordConfirmation() {
  return hook => {
    delete hook.data.password_confirmation;
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
      validate(schemaValidator),
      // TODO already exist
      removePasswordConfirmation(),
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
