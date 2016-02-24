import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';

export default class CategoryListItem extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  }

  render() {
    const { image, id, path, url, title } = this.props.item;
    const styles = require('./CategoryListItem.scss');
    return (
      <li className={styles.categoryListItem} style={{backgroundImage: `url(${image})`}}>
        { path ? (
          <Link key={id} to={path} state={{title: title}}>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{title}</h3>
            </div>
          </Link> )
        : (
          <a href={url}>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{title}</h3>
            </div>
          </a>
        ) }
      </li>

    );
  }
}
