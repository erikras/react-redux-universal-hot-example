import React, { PropTypes } from 'react';

class FacebookLogin extends React.Component {
  static propTypes = {
    callback: PropTypes.func.isRequired,
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
    component: PropTypes.func
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
  };

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

  checkLoginState = response => {
    if (response.authResponse) {
      this.props.callback(null, response.authResponse);
    } else {
      this.props.callback(response);
    }
  };

  click = () => {
    const { scope, appId } = this.props;
    if (navigator.userAgent.match('CriOS')) {
      window.location.href = `https://www.facebook.com/dialog/oauth?client_id=${appId}` +
        `&redirect_uri=${window.location.href}&state=facebookdirect&${scope}`;
    } else {
      window.FB.login(this.checkLoginState, { scope });
    }
  };

  render() {
    const { className, textButton, typeButton, component: Component } = this.props;

    return (
      Component ? <Component facebookLogin={this.click} /> :
        <button className={className} onClick={this.click} type={typeButton}>
          {textButton}
        </button>
    );
  }
}

export default FacebookLogin;
