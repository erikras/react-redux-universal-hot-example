import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { RegisterForm } from 'components';
import * as authActions from 'redux/modules/auth';
import * as notifActions from 'redux/modules/notifs';

@connect(
  () => ({}),
  { ...notifActions, ...authActions })
export default class Register extends Component {
  static propTypes = {
    location: PropTypes.object,
    register: PropTypes.func,
    notifSend: PropTypes.func,
    oauthLogin: PropTypes.func
  }

  register = data => {
    const { location } = this.props;
    if (location.state && location.state.oauth) {
      const { provider, data: oauthData } = location.state.oauth;
      console.log(oauthData, data);
      return this.props.oauthLogin(provider, { ...oauthData, user: data }, true).then(this.successRegister);
    }
    return this.props.register(data).then(this.successRegister);
  }

  successRegister = result => {
    this.props.notifSend({
      message: 'You\'r now registered !',
      kind: 'success',
      dismissAfter: 2000
    });
    return result;
  }

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
