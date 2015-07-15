import {
  INFO_LOAD,
  INFO_LOAD_SUCCESS,
  INFO_LOAD_FAIL
} from './actionTypes';

export function load() {
  return {
    types: [INFO_LOAD, INFO_LOAD_SUCCESS, INFO_LOAD_FAIL],
    promise: (client) => client.get('/loadInfo')
  };
}
