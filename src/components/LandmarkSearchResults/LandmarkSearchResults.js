import React, { Component, PropTypes } from 'react';
import { LandmarkList } from 'components';

export default class LandmarkSearchResults extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    results: PropTypes.object
  }

  render() {
    const styles = require('./LandmarkSearchResults.scss');
    const {loading} = this.props;
    const {query, results} = this.props.results;
    const hasResults = results && results.length;
    const numResults = results.length + ' ' + (results.length === 1 ? 'result' : 'results');
    const loadingStyle = loading ? { opacity: 0.7, transition: 'opacity 300ms' } : {};
    return (
      <div style={loadingStyle}>
        <div className={styles.withTiltSibling}>
          <p className={styles.numResults}>{numResults} for <i>{query}</i></p>
        </div>
        { hasResults ? <LandmarkList items={results} /> : '' }
      </div>
    );
  }
}
