import React, { Component, PropTypes } from 'react';
import {Loader, AreaListItem} from 'components';

export default class AreaList extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
  }

  render() {
    const styles = require('./../LandmarkList/LandmarkList.scss');
    const { items } = this.props;
    if (!items) return ( <Loader /> );
    const AreaListItems = items.map( item =>
      <AreaListItem key={item.id} item={item} />
    );
    return (
      <div className={styles.landmarkList}>
        <ul>
          {AreaListItems}
        </ul>
      </div>
    );
  }
}
