import {createValidator, required, maxLength, integer, oneOf} from 'utils/validation';

export const colors = ['Blue', 'Fuchsia', 'Green', 'Orange', 'Red', 'Taupe'];

const widgetValidation = createValidator({
  color: [required, oneOf(colors)],
  sprocketCount: [required, integer],
  owner: [required, maxLength(30)]
});
export default widgetValidation;
