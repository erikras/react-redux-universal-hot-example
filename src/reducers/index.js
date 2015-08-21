import {createFormReducer} from 'redux-form';
export info from './info';
export widgets from './widgets';
export auth from './auth';
export counter from './counter';
export const surveyForm = createFormReducer('surveyForm', ['name', 'email', 'occupation']);
export const widgetForm = createFormReducer('widgetForm', ['color', 'sprocketCount', 'owner']);
