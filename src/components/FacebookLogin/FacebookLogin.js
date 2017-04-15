import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FacebookLogin extends Component {
  static propTypes = {
    onLogin: PropTypes.func.isRequired,
    appId: PropTypes.string.isRequired,
    xfbml: PropTypes.bool,
    cookie: PropTypes.bool,
    scope: PropTypes.string,
    autoLoad: PropTypes.bool,
    version: PropTypes.string,
    language: PropTypes.string,
    textButton: PropTypes.string,
    typeButton: PropTypes.string,
    className: PropTypes.string,
    component: PropTypes.func.isRequired
  };

  static defaultProps = {
    textButton: 'Login with Facebook',
    typeButton: 'button',
    className: '',
    scope: 'public_profile,email',
    xfbml: false,
    cookie: false,
    version: '2.3',
    language: 'en_US',
    autoLoad: false
  }

  componentDidMount() {
    const { appId, xfbml, cookie, version, autoLoad, language } = this.props;
    let fbRoot = document.getElementById('fb-root');

    if (!fbRoot) {
      fbRoot = document.createElement('div');
      fbRoot.id = 'fb-root';

      document.body.appendChild(fbRoot);
    }

    window.fbAsyncInit = () => {
      window.FB.init({
        version: `v${version}`,
        appId,
        xfbml,
        cookie,
      });

      if (autoLoad || window.location.search.includes('facebookdirect')) {
        window.FB.getLoginStatus(this.checkLoginState);
      }
    };
    // Load the SDK asynchronously
    ((d, id) => {
      if (d.getElementById(id)) return;
      const js = d.createElement('script');
      js.id = id;
      js.src = `//connect.facebook.net/${language}/all.js`;
      d.body.appendChild(js);
    })(document, 'facebook-jssdk');
  }

  click = () => {
    const { scope, appId } = this.props;
    if (navigator.userAgent.match('CriOS')) {
      window.location.href = `https://www.facebook.com/dialog/oauth?client_id=${appId}` +
        `&redirect_uri=${window.location.href}&state=facebookdirect&${scope}`;
    } else {
      window.FB.login(response => {
        if (response.authResponse) {
          this.props.onLogin(null, response.authResponse);
        } else {
          this.props.onLogin(response);
        }
      }, { scope });
    }
  };

  render() {
    const { className, textButton, typeButton, component: WrappedComponent } = this.props;

    if (WrappedComponent) return <WrappedComponent facebookLogin={this.click} />;

    return (
      <button className={className} onClick={this.click} type={typeButton}>
        {textButton}
      </button>
    );
  }
}

export default FacebookLogin;
