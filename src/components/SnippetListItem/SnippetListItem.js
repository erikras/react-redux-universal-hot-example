import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';

export default class SnippetListItem extends Component {
  static propTypes = {
    description: PropTypes.string,
    image: PropTypes.string,
    id: PropTypes.string,
    key: PropTypes.string,
    location: PropTypes.object,
    title: PropTypes.string
  }

  render() {
    const {description, image, id, key, location, title} = this.props;
    const styles = require('./SnippetListItem.scss');
    return (
      <li className={styles.snippetListItem}>
        <div>
          <img src={image} alt="" />
          <h2>
            <Link key={key} to={`/snippet/${id}`} state={{ modal: true, returnTo: location.pathname }}>
              {title}
            </Link>
          </h2>
          <p>{description}</p>
        </div>
      </li>
    );
  }
}
