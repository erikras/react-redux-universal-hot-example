import React, { Component, PropTypes } from 'react';
import {Loader, CategorySnippetsListItem} from 'components';

export default class CategorySnippetsList extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
  }

  render() {
    const styles = require('./../LandmarkList/LandmarkList.scss');
    const { items } = this.props;
    if (!items) return ( <Loader /> );
    const CategorySnippetsListItems = items.map( item =>
      <CategorySnippetsListItem key={item.id} item={item} />
    );
    return (
      <div className={styles.landmarkList}>
        <ul>
          {CategorySnippetsListItems}
        </ul>
      </div>
    );
  }
}
