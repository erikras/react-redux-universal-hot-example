import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { RegisterForm } from 'components';
import { actions as notifActions } from 're-notif';
import * as authActions from 'redux/modules/auth';

@connect(
  () => ({}),
  { ...notifActions, ...authActions })
export default class Register extends Component {
  static propTypes = {
    register: PropTypes.func,
    notifSend: PropTypes.func
  }

  register = data => this.props.register(data)
  .then(result => {
    this.props.notifSend({
      message: 'You\'r now registered !',
      kind: 'success',
      dismissAfter: 1500
    });
    return result;
  });

  render() {
    return (
      <div className="container">
        <Helmet title="Register" />
        <h1>Register</h1>
        <RegisterForm onSubmit={this.register} />
      </div>
    );
  }
}
