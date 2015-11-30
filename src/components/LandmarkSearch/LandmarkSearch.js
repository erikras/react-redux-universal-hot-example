import React, { Component } from 'react';

export default
class LandmarkSearch extends Component {
  // static propTypes = {
  //   children: PropTypes.object.isRequired,
  //   returnTo: PropTypes.string
  // }
  constructor() {
    super();
    this.onSearchChanged = this.onSearchChanged.bind(this);
  }

  onSearchChanged() {
    console.log( (React.findDOMNode(this.refs.search).value) );
  }

  render() {
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
