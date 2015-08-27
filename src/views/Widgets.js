import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import DocumentMeta from 'react-document-meta';
import {connect} from 'react-redux';
import * as widgetActions from '../ducks/widgets';
import {isLoaded, load as loadWidgets} from '../ducks/widgets';
import {initializeWithKey} from 'redux-form';
import WidgetForm from '../components/WidgetForm';

@connect(
  state => ({
    widgets: state.widgets.data,
    editing: state.widgets.editing,
    error: state.widgets.error,
    loading: state.widgets.loading
  }),
  dispatch => ({
    ...bindActionCreators({
      ...widgetActions,
      initializeWithKey
    }, dispatch)
  })
)
export default
class Widgets extends Component {
  static propTypes = {
    widgets: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool,
    initializeWithKey: PropTypes.func.isRequired,
    editing: PropTypes.object.isRequired,
    load: PropTypes.func.isRequired,
    editStart: PropTypes.func.isRequired
  }

  render() {
    const {widgets, error, editing, loading, load} = this.props;
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
        <DocumentMeta title="React Redux Example: Widgets"/>
        <p>
          This data was loaded from the server before this route was rendered. If you hit refresh on your browser, the
          data loading will take place on the server before the page is returned. If you navigated here from another
          page, the data was fetched from the client.
        </p>
        <p>
          This widgets are stored in your session, so feel free to edit it and refresh.
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
            <th className={styles.idCol}>ID</th>
            <th className={styles.colorCol}>Color</th>
            <th className={styles.sprocketsCol}>Sprockets</th>
            <th className={styles.ownerCol}>Owner</th>
            <th className={styles.buttonCol}></th>
          </tr>
          </thead>
          <tbody>
          {
            widgets.map((widget) => editing[widget.id] ?
              <WidgetForm formKey={String(widget.id)} key={String(widget.id)}/> :
              <tr key={widget.id}>
                <td className={styles.idCol}>{widget.id}</td>
                <td className={styles.colorCol}>{widget.color}</td>
                <td className={styles.sprocketsCol}>{widget.sprocketCount}</td>
                <td className={styles.ownerCol}>{widget.owner}</td>
                <td className={styles.buttonCol}>
                  <button className="btn btn-primary" onClick={::this.handleEdit(widget)}>
                    <i className="fa fa-pencil"/> Edit
                  </button>
                </td>
              </tr>)
          }
          </tbody>
        </table>}
      </div>
    );
  }

  handleEdit(widget) {
    const {editStart, initializeWithKey} = this.props; // eslint-disable-line no-shadow
    return () => {
      initializeWithKey('widget', widget.id, widget);
      editStart(String(widget.id));
    };
  }

  static fetchData(store) {
    if (!isLoaded(store.getState())) {
      return store.dispatch(loadWidgets());
    }
  }
}

