import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {isLoaded} from '../reducers/widgets';
import {connect} from 'react-redux';
import * as widgetActions from '../actions/widgetActions';
import {load as loadWidgets} from '../actions/widgetActions';

@connect(
    state => ({
    widgets: state.widgets.data,
    error: state.widgets.error,
    loading: state.widgets.loading
  }),
    dispatch => bindActionCreators(widgetActions, dispatch)
)
export default
class Widgets extends Component {
  static propTypes = {
    widgets: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool,
    load: PropTypes.func.isRequired
  }

  static fetchData(store) {
    if (!isLoaded(store.getState())) {
      return store.dispatch(loadWidgets());
    }
  }

  render() {
    const {widgets, error, loading, load} = this.props;
    let refreshClassName = 'fa fa-refresh';
    if (loading) {
      refreshClassName += ' fa-spin';
    }
    const styles = require('./Widgets.scss');
    return (
      <div className={styles.widgets + ' container'}>
        <h1>
          Widgets
          <button className={styles.refreshBtn + ' btn btn-success'} onClick={load}><i
            className={refreshClassName}/> {' '} Reload Widgets
          </button>
        </h1>
        <p>
          This data was loaded from the server before this route was rendered. If you hit refresh on your browser, the
          data loading will take place on the server before the page is returned. If you navigated here from another
          page, the data was fetched from the client.
        </p>
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

