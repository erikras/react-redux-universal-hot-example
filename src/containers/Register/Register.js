import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { RegisterForm } from 'components';
import * as authActions from 'redux/modules/auth';

@connect(
  () => ({}),
  authActions)
export default class Register extends Component {
  static propTypes = {
    register: PropTypes.func
  }

  render() {
    const { register } = this.props;
    return (
      <div className="container">
        <Helmet title="Register" />
        <h1>Register</h1>
        <RegisterForm onSubmit={register} />
      </div>
    );
  }
}
