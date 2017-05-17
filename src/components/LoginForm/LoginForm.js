import React, { Component } from 'react';
import { reduxForm, Field, propTypes } from 'redux-form';
import loginValidation from './loginValidation';

// eslint-disable-next-line react/prop-types
const Input = ({ input, label, type, meta: { touched, error } }) => (
  <div className={`form-group ${error && touched ? 'has-error' : ''}`}>
    <label htmlFor={input.name} className="col-sm-2">{label}</label>
    <div className="col-sm-10">
      <input {...input} type={type} className="form-control" />
      {error && touched && <span className="glyphicon glyphicon-remove form-control-feedback"></span>}
      {error && touched && <div className="text-danger"><strong>{error}</strong></div>}
    </div>
  </div>
);

@reduxForm({
  form: 'login',
  validate: loginValidation
})
export default class LoginForm extends Component {
  static propTypes = {
    ...propTypes
  }

  render() {
    const { handleSubmit, error } = this.props;

    return (
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <Field name="email" type="text" component={Input} label="Email" />
        <Field name="password" type="password" component={Input} label="Password" />
        {error && <p className="text-danger"><strong>{error}</strong></p>}
        <button className="btn btn-success" type="submit">
          <i className="fa fa-sign-in" />{' '}Log In
        </button>
      </form>
    );
  }
}
