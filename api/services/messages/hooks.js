import hooks from 'feathers-hooks-common';
import auth from 'feathers-authentication';
import { required } from 'utils/validation';
import { validateHook as validate } from 'hooks';

const schemaValidator = {
  text: required
};

function populateUser() {
  return hooks.populate({
    schema: {
      include: [{
        nameAs: 'sentBy',
        service: 'users',
        parentField: 'sentBy',
        childField: '_id'
      }]
    }
  });
}

const messagesHooks = {
  before: {
    all: auth.hooks.authenticate('jwt'),
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
    update: hooks.disable(),
    patch: hooks.disable(),
    remove: hooks.disable()
  },
  after: {
    all: [],
    find: [
      populateUser(),
      hooks.remove('sentBy.password')
    ],
    get: [
      populateUser(),
      hooks.remove('sentBy.password')
    ],
    create: [
      populateUser(),
      hooks.remove('sentBy.password')
    ],
    update: [],
    patch: [],
    remove: []
  }
};

export default messagesHooks;
