import React, { Component, PropTypes } from 'react';
import {Loader, LandmarkListItem} from 'components';

export default class LandmarkList extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
  }

  render() {
    const styles = require('./LandmarkList.scss');
    const { items } = this.props;
    if (!items) return ( <Loader /> );
    const LandmarkListItems = items.map( item =>
      <LandmarkListItem key={item.id} item={item} />
    );
    return (
      <div className={styles.landmarkList}>
        <ul>
          {LandmarkListItems}
        </ul>
      </div>
    );
  }
}
