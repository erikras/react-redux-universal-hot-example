import {createFormReducer} from 'redux-form';
export info from './info';
export widgets from './widgets';
export auth from './auth';
export counter from './counter';
export const survey = createFormReducer('survey', ['name', 'email', 'occupation']);
