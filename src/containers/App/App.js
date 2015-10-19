import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import { locales } from 'config';
import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import { LocalLink, InfoBar, LocaleSwitcher } from 'components';
import { pushState } from 'redux-router';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';


import intlUtils from 'utils/intl';

const title = 'React Redux Example';
const description = 'All the modern best practices in one example.';
const image = 'https://react-redux.herokuapp.com/logo.jpg';

const meta = {
  title,
  description,
  meta: {
    charSet: 'utf-8',
    property: {
      'og:site_name': title,
      'og:image': image,
      'og:locale': 'en_US',
      'og:title': title,
      'og:description': description,
      'twitter:card': 'summary',
      'twitter:site': '@erikras',
      'twitter:creator': '@erikras',
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': image,
      'twitter:image:width': '200',
      'twitter:image:height': '200'
    }
  }
};

@connect(
  state => ({user: state.auth.user}),
  {logout, pushState})
export default class App extends Component {

  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    pushState: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  };

  static childContextTypes = {
    locales: PropTypes.array.isRequired,
    currentLocale: PropTypes.string.isRequired
  };


  constructor(props, context) {
    super(props, context);
    this.state = {
      currentLocale: intlUtils.getCurrentLocale()
    };
  }

  getChildContext() {

    const {currentLocale} = this.state;

    return {
      locales: locales,
      currentLocale: currentLocale
    };
  }

  componentWillMount() {
    const {params, history, location} = this.props;
    intlUtils.initializer(params, history, location);
  }

  componentWillReceiveProps(nextProps) {

    const {currentLocale} = this.state;

    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState(null, `/${currentLocale}/loginSuccess`);
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState(null, `/${currentLocale}`);
    }
  }

  static fetchData(getState, dispatch) {
    const promises = [];
    if (!isInfoLoaded(getState())) {
      promises.push(dispatch(loadInfo()));
    }
    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }
    return Promise.all(promises);
  }

  handleLogout(event) {
    event.preventDefault();
    this.props.logout();
  }

  render() {
    const {user} = this.props;
    const styles = require('./App.scss');
    return (
      <div className={styles.app}>
        <DocumentMeta {...meta}/>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container">

            <LocalLink to="/" className="navbar-brand">
              <div className={styles.brand}/>
              React Redux <FormattedMessage id="app.nav.title" />
            </LocalLink>

            <ul className="nav navbar-nav">
              {user && <li><LocalLink to="/chat"><FormattedMessage id="app.nav.chat" /></LocalLink></li>}

              <li><LocalLink to="/widgets"><FormattedMessage id="app.nav.widget" /></LocalLink></li>
              <li><LocalLink to="/survey"><FormattedMessage id="app.nav.survey" /></LocalLink></li>
              <li><LocalLink to="/about"><FormattedMessage id="app.nav.about" /></LocalLink></li>
              {!user && <li><LocalLink to="/login"><FormattedMessage id="app.nav.login" /></LocalLink></li>}
              {user && <li className="logout-link"><LocalLink to="/logout" onClick={::this.handleLogout}><FormattedMessage id="app.nav.logout" /></LocalLink></li>}
            </ul>
            {user &&
            <p className={styles.loggedInMessage + ' navbar-text'}><FormattedHTMLMessage id="app.nav.loginMsg" values={{'name': user.name}} /></p>}
            <ul className="nav navbar-nav navbar-right">
              <LocaleSwitcher/>
              <li>
                <a href="https://github.com/erikras/react-redux-universal-hot-example"
                   target="_blank" title="View on Github"><i className="fa fa-github"/></a>
              </li>
            </ul>
          </div>
        </nav>
        <div className={styles.appContent}>
          {this.props.children}
        </div>
        <InfoBar/>

        <div className="well text-center">
          Have questions? Ask for help <a
          href="https://github.com/erikras/react-redux-universal-hot-example/issues"
          target="_blank">on Github</a> or in the <a
          href="http://www.reactiflux.com/" target="_blank">#react-redux-universal</a> Slack channel.
        </div>
      </div>
    );
  }
}
