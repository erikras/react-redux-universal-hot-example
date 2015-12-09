import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';

export default class CategoryListItem extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  }

  render() {
    const { image, id, slug, title } = this.props.item;
    const styles = require('./categoryListItem.scss');
    return (
      <li className={styles.categoryListItem} style={{backgroundImage: `url(${image})`}}>
        <Link key={id} to={`/category/${slug}`} state={{title: title}}>
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>
              {title}
            </h3>
          </div>
        </Link>
      </li>
    );
  }
}
