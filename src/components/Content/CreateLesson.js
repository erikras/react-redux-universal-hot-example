// Helper styles for demo
// import './helper.css';

import React from 'react';
import { render } from 'react-dom';
import { withFormik } from 'formik';
// import Yup from 'yup';
import * as Yup from 'yup'

// Our inner form component. Will be wrapped with Formik({..})
const MyInnerForm = props => {
  const {
    values,
    touched,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title" style={{ display: 'block' }}>
        Title
      </label>
      <input
        id="title"
        placeholder="Enter your title/name"
        type="text"
        value={values.title}
        onChange={handleChange}
        onBlur={handleBlur}
        className={errors.title && touched.title ? 'text-input error' : 'text-input'}
      />
      {errors.title &&
      touched.title && <div className="input-feedback">{errors.title}</div>}

      <button
        type="button"
        className="outline"
        onClick={handleReset}
        disabled={!dirty || isSubmitting}
      >
        Reset
      </button>
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>

    </form>
  );
};

const EnhancedForm = withFormik({
  mapPropsToValues: () => ({ title: '' }),
  // validationSchema: Yup.object().shape({
  //   email: Yup.string()
  //     .email('Invalid email address')
  //     .required('Email is required!'),
  // }),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.onChange(values);
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  },
  displayName: 'BasicForm', // helps with React DevTools
})(MyInnerForm);

const CreateLesson = (props) => (
  <div className="app">
    <h1>
      Your title
    </h1>

    <EnhancedForm {...props}/>
  </div>
);

// export default CreateLesson;
// render(<App />, document.getElementById('root'));
module.exports = CreateLesson;
