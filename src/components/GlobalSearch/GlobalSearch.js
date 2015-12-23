import React, { Component, PropTypes } from 'react';
import { LandmarkSearch } from 'components';

export default class GlobalSearch extends Component {
  static propTypes = {
    shouldBeClear: PropTypes.bool,
    shouldBeOpen: PropTypes.bool,
  }

  constructor(props) {
    super(props);
    this.state = { searchVisibile: this.props.shouldBeOpen || false };
    this.showSearch = this.showSearch.bind(this);
    this.hideSearch = this.hideSearch.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if ( typeof nextProps.shouldBeOpen === 'boolean' ) {
      this.setState({ searchVisibile: (nextProps.shouldBeOpen) });
    }

  }

  showSearch() {
    this.setState({ searchVisibile: true });
  }

  hideSearch() {
    this.setState({ searchVisibile: false });
  }

  toggleSearch() {
    this.state.searchVisibile ? this.hideSearch() : this.showSearch(); // eslint-disable-line no-unused-expressions
  }

  render() {
    const styles = require('./GlobalSearch.scss');
    const searchVisibileStyle = this.state.searchVisibile ? styles.searchOpen : '';
    return (
      <div className={ styles.search + ' ' + searchVisibileStyle }>
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
          <LandmarkSearch clearResults={!this.state.searchVisibile} />
        </div>
      </div>
    );
  }
}
