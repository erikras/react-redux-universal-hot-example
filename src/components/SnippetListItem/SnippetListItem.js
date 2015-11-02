import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';

export default class SnippetListItem extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  }

  render() {
    const { location } = this.props;
    const { image, id, slug, title, teaser } = this.props.item;
    const snippet = this.props.item;
    const styles = require('./SnippetListItem.scss');
    return (
      <li className={styles.snippetListItem}>
        <div className={styles.thumb}>
          <img src={image.thumb.src} width={image.thumb.width} height={image.thumb.height} style={{backgroundImage: `url(data:image/jpeg;base64,${image.preview})`, backgroundSize: 'cover', backgroundPosition: 'center'}} alt="" />
        </div>
        <div>
          <h2>
            <Link key={id} to={`/snippet/${slug}`} state={{ modal: true, returnTo: location.pathname, snippet: snippet }}>
              {title}
            </Link>
          </h2>
          <p>{teaser}</p>
        </div>
      </li>
    );
  }
}
/*  srcSet={`${image.thumb.src} ${image.thumb.width}w, ${image.small.src} ${image.small.width}w`} */
