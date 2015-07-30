import createFormReducer from './createFormReducer';
import surveyValidation from '../validation/surveyValidation';
export info from './info';
export widgets from './widgets';
export auth from './auth';
export counter from './counter';
export const survey = createFormReducer('survey', surveyValidation);
