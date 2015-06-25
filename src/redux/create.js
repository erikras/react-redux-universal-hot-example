import { createRedux, createDispatcher, composeStores } from 'redux';
import middleware from './clientMiddleware';
import * as stores from '../stores/index';

const store = composeStores(stores);

export default function(client, data) {
  const dispatcher = createDispatcher(store, () => [middleware(client)]);

  return createRedux(dispatcher, data);
}

