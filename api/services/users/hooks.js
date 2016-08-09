import hooks from 'feathers-hooks';
import { hooks as auth } from 'feathers-authentication';
import { validateHook as validate } from '../../hooks';
import { required, email, match, unique } from '../../utils/validation';

const schemaValidator = {
  email: [required, email, unique('email')],
  password: [required],
  password_confirmation: [required, match('password')]
};

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
