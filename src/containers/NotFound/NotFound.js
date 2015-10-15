import React, {Component, PropTypes} from 'react';
import DocumentMeta from 'react-document-meta';

export default class NotFound extends Component {
  static propTypes = {
    changeHeader: PropTypes.func,
  }

  componentDidMount() {
    const headerTitle = 'Page Not Found';
    this.props.changeHeader(headerTitle);
  }

  render() {
    return (
      <div className="container">
        <DocumentMeta title="404 – Page not found"/>
        <h1>Doh! 404!</h1>
        <p>These are <em>not</em> the droids you are looking for!</p>
      </div>
    );
  }
}
