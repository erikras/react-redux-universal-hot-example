import React, { Component, PropTypes } from 'react';
import { LandmarkList } from 'components';

export default class LandmarkSearchResults extends Component {
  static propTypes = {
    results: PropTypes.object
  }

  render() {
    const {query, results} = this.props.results;
    const hasResults = results && results.length;
    const numResults = results.length + ' ' + (results.length === 1 ? 'result' : 'results');
    return (
      <div>
        <p>{numResults} for <i>{query}</i></p>
        { hasResults ? <LandmarkList items={results} /> : '' }
      </div>
    );
  }
}
