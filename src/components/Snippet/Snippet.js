import React, { Component, PropTypes } from 'react';
import { Image } from 'components';

export default
class Snippet extends Component {

  static propTypes = {
    location: PropTypes.object,
    params: PropTypes.object,
    snippet: PropTypes.object,
  }

  componentWillMount() {
    if (this.props.location.state && this.props.location.state.snippet) {
      // Bypass AJAX call if already have data
      const snippetFromState = this.props.location.state.snippet;
      this.setState({snippet: snippetFromState});
    } else {
      // do ajax call
      // const slug = this.props.params.slug;
    }
  }

  render() {
    const styles = require('./Snippet.scss');
    if (!(this.state && this.state.snippet)) return (<h2>Cannot render snippet</h2>);
    const { description, image, title } = this.state.snippet;
    return (
      <div className={styles.snippet}>
        { image && <Image image={image} size="small" /> }
        <h2>{title}</h2>
        <code>{description}</code>
      </div>
    );
  }
}
