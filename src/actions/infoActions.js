import {
  INFO_LOAD,
  INFO_LOAD_SUCCESS,
  INFO_LOAD_FAIL
} from './actionTypes';

function loadFromServer(client) {
  return client.get('/loadInfo')
    .then((result) => {
      return result;
    });
}

export function load() {
  return {
    types: [INFO_LOAD, INFO_LOAD_SUCCESS, INFO_LOAD_FAIL],
    promise: (client) => loadFromServer(client)
  };
}
