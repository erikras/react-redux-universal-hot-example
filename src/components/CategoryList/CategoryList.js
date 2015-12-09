import React, { Component, PropTypes } from 'react';
import {Loader, CategoryListItem} from 'components';

export default class CategoryList extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
  }

  render() {
    const styles = require('./../LandmarkList/LandmarkList.scss');
    const { items } = this.props;
    if (!items) return ( <Loader /> );
    const CategoryListItems = items.map( item =>
      <CategoryListItem key={item.id} item={item} />
    );
    return (
      <div className={styles.landmarkList}>
        <ul>
          {CategoryListItems}
        </ul>
      </div>
    );
  }
}
