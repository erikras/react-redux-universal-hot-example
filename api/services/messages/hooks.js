import hooks from 'feathers-hooks-common';
import auth from 'feathers-authentication';
import { required } from 'utils/validation';
import { validateHook as validate } from 'hooks';

const schemaValidator = {
  text: [required]
};

const populateUserOptions = {
  service: 'users',
  field: 'sentBy'
};

const messagesHooks = {
  before: {
    all: [
      auth.hooks.authenticate('jwt')
    ],
    find: [],
    get: [],
    create: [
      validate(schemaValidator),
      hook => {
        hook.data = {
          text: hook.data.text,
          sentBy: hook.params.user._id, // Set the id of current user
          createdAt: new Date()
        };
      }
    ],
    update: [hooks.disable()],
    patch: [hooks.disable()],
    remove: [hooks.disable()]
  },
  after: {
    all: [],
    find: [hooks.populate('sentBy', populateUserOptions), hooks.remove('sentBy.password')],
    get: [hooks.populate('sentBy', populateUserOptions), hooks.remove('sentBy.password')],
    create: [hooks.populate('sentBy', populateUserOptions), hooks.remove('sentBy.password')],
    update: [],
    patch: [],
    remove: []
  }
};

export default messagesHooks;
