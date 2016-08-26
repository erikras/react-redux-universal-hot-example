import hooks from 'feathers-hooks';
import { hooks as auth } from 'feathers-authentication';
import { validateHook as validate } from '../../hooks';
import { required } from '../../utils/validation';

const schemaValidator = {
  text: [required]
};

const options = {
  service: 'users',
  field: 'sentBy'
};

const messagesHooks = {
  before: {
    all: [
      auth.verifyToken(),
      auth.populateUser(),
      auth.restrictToAuthenticated()
    ],
    find: [],
    get: [],
    create: [
      validate(schemaValidator),
      hook => {
        hook.data = {
          text: hook.data.text,
          sentBy: hook.params.user.id, // Set the id of current user
        };
      }
    ],
    update: [hooks.disable()], // TODO: restrict to sender
    patch: [hooks.disable()], // TODO: restrict to sender
    remove: [hooks.disable()] // TODO: restrict to sender
  },
  after: {
    all: [],
    find: [],
    get: [hooks.populate('sentBy', options), hooks.remove('sentBy.password')],
    create: [hooks.populate('sentBy', options), hooks.remove('sentBy.password')],
    update: [],
    patch: [],
    remove: []
  }
};

export default messagesHooks;
