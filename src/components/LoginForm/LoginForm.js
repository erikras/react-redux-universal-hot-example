import React, { Component } from 'react';
import { reduxForm, propTypes } from 'redux-form';
import loginValidation from './loginValidation';

@reduxForm({
  form: 'login',
  fields: ['email', 'password'],
  validate: loginValidation
})
export default class LoginForm extends Component {
  static propTypes = {
    ...propTypes
  }

  render() {
    const {
      fields: { email, password },
      handleSubmit,
      error
    } = this.props;
    const renderInput = (field, label, type = 'text') =>
      <div className={`form-group ${field.error && field.touched ? 'has-error' : ''}`}>
        <label htmlFor={field.name} className="col-sm-2">{label}</label>
        <div className="col-sm-10">
          <input type={type} className="form-control" name={field.name} {...field} />
          {field.error && field.touched && <span className="glyphicon glyphicon-remove form-control-feedback"></span>}
          {field.error && field.touched && <div className="text-danger"><strong>{field.error}</strong></div>}
        </div>
      </div>;

    return (
      <form className="form-horizontal" onSubmit={handleSubmit}>
        {renderInput(email, 'Email')}
        {renderInput(password, 'Password', 'password')}
        {error && <p className="text-danger"><strong>{error}</strong></p>}
        <button className="btn btn-success" type="submit">
          <i className="fa fa-sign-in" />{' '}Log In
        </button>
      </form>
    );
  }
}
