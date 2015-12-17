import React, {Component, PropTypes} from 'react';

export default class GlobalSearchResults extends Component {
  static propTypes = {
    items: PropTypes.object,
  }

  render() {
    // const { image, id, slug, title } = this.props.item;
    const styles = require('./GlobalSearchResults.scss');
    return (
      <div className={styles.globalSearchResults}>
        searchy!
      </div>
    );
  }
}
