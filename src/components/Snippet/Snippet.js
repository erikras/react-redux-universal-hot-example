import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { Image } from 'components';
import * as snippetActions from 'redux/modules/snippet';
import { snippetIsLoaded, loadSnippet } from 'redux/modules/snippet';

@connect(
  state => ({
    snippet: state.snippet.data,
    error: state.snippet.error,
    loading: state.snippet.loading
  }),
  {...snippetActions})

export default
class Snippet extends Component {

  static propTypes = {
    loading: PropTypes.bool,
    location: PropTypes.object,
    params: PropTypes.object,
    snippet: PropTypes.object,
  }

  static fetchDataDeferred(getState, dispatch) {
    const state = getState();
    if (!snippetIsLoaded(state)) {
      return dispatch(loadSnippet(state.router.params.slug));
    }
  }

  // componentWillMount() {
  //   if (this.props.location.state && this.props.location.state.snippet) {
  //     // Bypass AJAX call if already have data
  //     const snippetFromState = this.props.location.state.snippet;
  //     this.setState({snippet: snippetFromState});
  //   } else {
  //     // do ajax call
  //     // const slug = this.props.params.slug;
  //   }
  // }

  render() {
    const styles = require('./Snippet.scss');
    // if (!(this.state && this.state.snippet)) return (<h2>Cannot render snippet</h2>);
    // const { description, image, title } = this.state.snippet;

    const { location, loading, snippet } = this.props;

    if (loading) return (<h2>Loading snippet...</h2>);
    if (!snippet) return (<h2>Unable to load snippet</h2>);

    const { description, image, title } = this.props.snippet;
    console.log('rendering snippet...', location);

    return (
      <div className={styles.snippet}>
        { image && <Image image={image} size="small" /> }
        <h2>{title}</h2>
        <code>{description}</code>
      </div>
    );
  }
}
