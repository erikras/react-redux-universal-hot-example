import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { isLoaded as isinitialStateLoaded, load as loadInitialState } from 'redux/modules/initialState';
import { push } from 'react-router-redux';
import config from 'config';
import { asyncConnect } from 'redux-connect';

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];

    if (!isinitialStateLoaded(getState())) {
      promises.push(dispatch(loadInitialState()));
    }
    return Promise.all(promises);
  }
}])
@connect(
  state => ({
    initialMessage: state.initialState.initialMessage
  }),
  { pushState: push })
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    initialMessage: PropTypes.string,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  /* Elimine la intercepcion de prop del usuario para cambiar el stado del login */

  render() {
    const { initialMessage } = this.props;
    const styles = require('./App.scss');

    return (
      <div className={styles.app}>
        <Helmet {...config.app.head} />
        <div>Contenido de la Aplicacion</div>
        <div>{initialMessage}</div>

        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}
