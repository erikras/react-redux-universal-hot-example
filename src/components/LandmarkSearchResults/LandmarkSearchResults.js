import React, { Component, PropTypes } from 'react';
import { LandmarkList } from 'components';

export default class LandmarkSearchResults extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    results: PropTypes.object
  }

  render() {
    const {loading} = this.props;
    const {query, results} = this.props.results;
    const hasResults = results && results.length;
    const numResults = results.length + ' ' + (results.length === 1 ? 'result' : 'results');
    const styles = loading ? { opacity: 0.7, transition: 'opacity 300ms' } : {};
    return (
      <div style={styles}>
        <p>{numResults} for <i>{query}</i></p>
        { hasResults ? <LandmarkList items={results} /> : '' }
      </div>
    );
  }
}
