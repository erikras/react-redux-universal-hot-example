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
      auth.isAuthenticated()
    ],
    find: [],
    get: [],
    create: [
      validate(schemaValidator),
      hook => {
        hook.data = {
          text: hook.data.text,
          sentBy: hook.params.user._id, // Set the id of current user
        };
      },
      hook => {
        hook.data.createdAt = new Date();
      }
    ],
    update: [hooks.disable()],
    patch: [hooks.disable()],
    remove: [hooks.disable()]
  },
  after: {
    all: [],
    find: [hooks.populate('sentBy', options), hooks.remove('sentBy.password')],
    get: [hooks.populate('sentBy', options), hooks.remove('sentBy.password')],
    create: [hooks.populate('sentBy', options), hooks.remove('sentBy.password')],
    update: [],
    patch: [],
    remove: []
  }
};

export default messagesHooks;
