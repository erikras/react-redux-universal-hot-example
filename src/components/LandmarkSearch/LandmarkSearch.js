import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import * as landmarksSearchActions from 'redux/modules/landmarksSearch';
import { doSearch, searchIsDone } from 'redux/modules/landmarksSearch';

@connect(
  state => ({
    landmarksSearch: state.landmarksSearch,
  }),
  {...landmarksSearchActions})

export default
class LandmarkSearch extends Component {
  static propTypes = {
    landmarksSearch: PropTypes.object,
  }

  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props, context);
    this.onSearchChanged = this.onSearchChanged.bind(this);
    console.log('context is: ', context);

  }

  onSearchChanged() {
    const query = ReactDOM.findDOMNode(this.refs.search).value;
    console.log(this);
    const state = this.context.store.getState();
    if (query.length && !searchIsDone(state, query)) {
      return this.context.store.dispatch(doSearch(query));
    }
  }

  render() {
    console.log('props are: ', this.props.landmarksSearch);
    const styles = require('./LandmarkSearch.scss');
    return (
      <form className={styles.landmarkSearch}>
        <fieldset>
          <input ref="search" type="search" onChange={this.onSearchChanged} placeholder="Landmark Name or Number" />
        </fieldset>
      </form>
    );
  }
}
