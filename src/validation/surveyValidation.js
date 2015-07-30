const rules = {
  name: (value) => {
    if (value === undefined || value === null || value === '') {
      return 'Required';
    }
  },
  email: (value) => {
    if (value === undefined || value === null || value === '') {
      return 'Required';
    }
  }
};

export default function surveyValidation(data = {}) {
  const errors = {};
  Object.keys(rules).forEach((key) => {
    errors[key] = rules[key](data[key]);
  });
  return errors;
}