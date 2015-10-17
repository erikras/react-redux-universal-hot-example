import React, {Component, PropTypes} from 'react';

export default class Header extends Component {
  static propTypes = {
    key: PropTypes.number,
    description: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string
  }

  render() {
    const {key, title, description, image} = this.props;
    const styles = require('./SnippetListItem.scss');
    return (
      <li className={styles.snippetListItem}>
        <div>
          <img src={image} alt="" />
          <h2><a href={`/snippet/` + key}>{title}</a></h2>
          <p>{description}</p>
        </div>
      </li>
    );
  }
}
