/*global __CLIENT__*/
import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {isLoaded} from '../reducers/widgets';
import {connect} from 'react-redux';
import * as widgetActions from '../actions/widgetActions';
import {load as loadWidgets} from '../actions/widgetActions';
if (__CLIENT__) {
  require('./Widgets.scss');
}

class Widgets extends Component {
  static propTypes = {
    widgets: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool,
    load: PropTypes.func.isRequired
  }

  render() {
    const {widgets, error, loading, load} = this.props;
    let refreshClassName = 'fa fa-refresh';
    if (loading) {
      refreshClassName += ' fa-spin';
    }
    return (
      <div className="widgets">
        <h1>
          Widgets
          <button className="refresh-btn btn btn-success" onClick={load}><i className={refreshClassName}/> {' '} Reload Widgets</button>
        </h1>
        {error &&
        <div className="alert alert-danger" role="alert">
          <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
          {' '}
          {error}
        </div>}
        {widgets && widgets.length &&
        <table className="table table-striped">
          <thead>
          <tr>
            <th>ID</th>
            <th>Color</th>
            <th>Sprockets</th>
            <th>Owner</th>
          </tr>
          </thead>
          <tbody>
          {
            widgets.map((widget) => <tr key={widget.id}>
              <td>{widget.id}</td>
              <td>{widget.color}</td>
              <td>{widget.sprocketCount}</td>
              <td>{widget.owner}</td>
            </tr>)
          }
          </tbody>
        </table>}
      </div>
    );
  }
}

@connect(state => ({
  widgets: state.widgets.data,
  error: state.widgets.error,
  loading: state.widgets.loading
}))
export default class WidgetsContainer {
  static propTypes = {
    widgets: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool,
    dispatch: PropTypes.func.isRequired
  }

  static fetchData(store) {
    if (!isLoaded(store.getState())) {
      return store.dispatch(loadWidgets());
    }
  }

  render() {
    const { widgets, error, loading, dispatch } = this.props;
    return <Widgets widgets={widgets} error={error}
                    loading={loading} {...bindActionCreators(widgetActions, dispatch)}/>;
  }
}
