import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as landmarksSearchActions from 'redux/modules/landmarksSearch';
import { doSearch, searchIsDone } from 'redux/modules/landmarksSearch';
import { LandmarkSearchResults } from 'components';
import * as _ from 'lodash';

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
    this.refreshSearch = this.refreshSearch.bind(this);
  }

  refreshSearch() {
    const value = ReactDOM.findDOMNode(this.refs.search).value;
    const query = value.length ? value : ' ';
    const state = this.context.store.getState();
    if (!searchIsDone(state, query)) {
      return this.context.store.dispatch(doSearch(query));
    }
  }

  render() {
    console.log('my state is', this.state);
    console.log('my context is ', this.context.store.getState());
    const styles = require('./LandmarkSearch.scss');
    const { loading, results } = this.props.landmarksSearch;
    return (
      <div>
        <form className={styles.landmarkSearch}>
          <fieldset>
            <input ref="search" type="search" onChange={_.debounce(this.refreshSearch, 300)} placeholder="Landmark Name or Number" />
          </fieldset>
        </form>
        { results ? <LandmarkSearchResults results={results} loading={loading} /> : ''}
      </div>
    );
  }
}
