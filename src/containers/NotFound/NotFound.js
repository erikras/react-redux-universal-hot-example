import React, {Component, PropTypes} from 'react';
import DocumentMeta from 'react-document-meta';

export default class NotFound extends Component {
  static propTypes = {
    activeNavItem: PropTypes.func,
    changeHeader: PropTypes.func
  }

  componentDidMount() {
    this.props.changeHeader('Page not found');
    this.props.activeNavItem(null);
  }

  render() {
    const styles = require('./NotFound.scss');
    const fourofour = require('./404.jpg');
    return (
      <div className={styles.notFound}>
        <DocumentMeta title="404 – Page not found"/>
        <h1>We cannot find the page you were looking for</h1>
        <p>This can happen if the page has moved or the URL has been typed incorrectly.</p>
        <img src={fourofour} width="737" height="615" alt="Photo of Barry the bear holding a telescope" />
      </div>
    );
  }
}
