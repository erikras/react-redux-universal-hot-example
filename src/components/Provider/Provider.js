import { Component, Children } from 'react';
import PropTypes from 'prop-types';

let didWarnAboutReceivingStore = false;

function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}

function warnAboutReceivingStore() {
  if (didWarnAboutReceivingStore) {
    return;
  }
  didWarnAboutReceivingStore = true;

  warning(
    '<Provider> does not support changing `store` on the fly. ' +
    'It is most likely that you see this error because you updated to ' +
    'Redux 2.x and React Redux 2.x which no longer hot reload reducers ' +
    'automatically. See https://github.com/reactjs/react-redux/releases/' +
    'tag/v2.0.0 for the migration instructions.'
  );
}

export default class Provider extends Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
    restApp: PropTypes.object.isRequired,
    store: PropTypes.shape({
      subscribe: PropTypes.func.isRequired,
      dispatch: PropTypes.func.isRequired,
      getState: PropTypes.func.isRequired
    }).isRequired,
    children: PropTypes.element.isRequired
  };

  static childContextTypes = {
    app: PropTypes.object.isRequired,
    restApp: PropTypes.object.isRequired,
    store: PropTypes.shape({
      subscribe: PropTypes.func.isRequired,
      dispatch: PropTypes.func.isRequired,
      getState: PropTypes.func.isRequired
    }).isRequired,
    storeSubscription: PropTypes.shape({
      trySubscribe: PropTypes.func.isRequired,
      tryUnsubscribe: PropTypes.func.isRequired,
      notifyNestedSubs: PropTypes.func.isRequired,
      isSubscribed: PropTypes.func.isRequired,
    })
  };

  constructor(props, context) {
    super(props, context);
    this.store = props.store;
    this.app = props.app;
    this.restApp = props.restApp;
  }

  getChildContext() {
    return {
      store: this.store,
      storeSubscription: null,
      app: this.app,
      restApp: this.restApp,
    };
  }

  componentWillReceiveProps = nextProps => {
    if (process.env.NODE_ENV !== 'production') {
      const { store } = this;
      const { store: nextStore } = nextProps;

      if (store !== nextStore) {
        warnAboutReceivingStore();
      }
    }
  }

  render() {
    return Children.only(this.props.children);
  }
}
