import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as globalSearchActions from 'redux/modules/globalSearch';
import { clearSearch, doSearch, searchIsDone } from 'redux/modules/globalSearch';
import { LandmarkSearchResults } from 'components';
import * as _ from 'lodash';

@connect(
  state => ({
    globalSearch: state.globalSearch,
  }),
  {...globalSearchActions})

export default class GlobalSearch extends Component {
  static propTypes = {
    globalSearch: PropTypes.object,
    location: PropTypes.object,
    searchOpen: PropTypes.func
  }

  static contextTypes = {
    // router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props, context);
    this.formEscape = this.formEscape.bind(this);
    this.globalSearchSubmit = this.globalSearchSubmit.bind(this);
    this.hideSearch = this.hideSearch.bind(this);
    this.refreshSearch = this.refreshSearch.bind(this);
    this.showSearch = this.showSearch.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
    this.state = { searchVisibile: false };
  }

  componentWillReceiveProps(nextProps) {
    // if we changed routes...
    if (nextProps.location.key !== this.props.location.key) {
      this.hideSearch();
    }
  }

  showSearch() {
    this.setState({ searchVisibile: true });
    this.props.searchOpen(true);
    ReactDOM.findDOMNode(this.refs.search).focus();
  }

  hideSearch() {
    this.setState({ searchVisibile: false });
    ReactDOM.findDOMNode(this.refs.form).reset();
    this.context.store.dispatch(clearSearch());
    this.props.searchOpen(false);
  }

  toggleSearch() {
    this.state.searchVisibile ? this.hideSearch() : this.showSearch(); // eslint-disable-line no-unused-expressions
  }

  globalSearchSubmit(event) {
    event.preventDefault();
    // console.log(this.context.router); // .push(...)
  }

  formEscape(event) {
    if (event.key === 'Escape') {
      this.hideSearch();
    }
  }

  refreshSearch() {
    const query = ReactDOM.findDOMNode(this.refs.search).value;
    const state = this.context.store.getState();
    if (!searchIsDone(state, query)) {
      return this.context.store.dispatch(doSearch(query));
    }
  }

  render() {
    const styles = require('./GlobalSearch.scss');
    const searchVisibileStyle = this.state.searchVisibile ? styles.searchOpen : '';
    const { loading, results } = this.props.globalSearch;

    return (
      <div className={ [styles.search, searchVisibileStyle].join(' ') }>
        <button onClick={this.toggleSearch}>
          <div className={styles.searchButton}>
            <svg fill="#000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
            <span>
              Search
            </span>
          </div>
          <div className={styles.closeButton}>
            <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
            <span>
              Close
            </span>
          </div>
        </button>
        <div className={styles.searchBox}>
          <form ref="form" className={styles.landmarkSearch} onSubmit={this.globalSearchSubmit} onKeyDownCapture={this.formEscape}>
            <fieldset>
              <input ref="search" type="search" onChange={_.debounce(this.refreshSearch, 300)} placeholder="Search for anything" />
            </fieldset>
          </form>
          { results ? <LandmarkSearchResults results={results} loading={loading} /> : ''}
        </div>
      </div>
    );
  }
}
