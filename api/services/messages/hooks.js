import { disallow, discard, populate } from 'feathers-hooks-common';
import auth from 'feathers-authentication';
import { required } from 'utils/validation';
import { validateHook as validate } from 'hooks';

const schemaValidator = {
  text: required
};

function populateUser() {
  return populate({
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
    update: disallow(),
    patch: disallow(),
    remove: disallow()
  },
  after: {
    all: [],
    find: [
      populateUser(),
      discard('sentBy.password')
    ],
    get: [
      populateUser(),
      discard('sentBy.password')
    ],
    create: [
      populateUser(),
      discard('sentBy.password')
    ],
    update: [],
    patch: [],
    remove: []
  }
};

export default messagesHooks;
