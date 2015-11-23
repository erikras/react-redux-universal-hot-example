import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import {connect} from 'react-redux';
import { Error, Image, Loader } from 'components';
import * as snippetActions from 'redux/modules/snippets';
import { snippetIsLoaded, loadSnippet } from 'redux/modules/snippets';

@connect(
  state => ({
    snippets: state.snippets,
  }),
  {...snippetActions})

export default
class Snippet extends Component {

  static propTypes = {
    location: PropTypes.object,
    params: PropTypes.object,
    snippets: PropTypes.object,
  }

  static fetchDataDeferred(getState, dispatch) {
    const state = getState();
    const snippetId = state.router.params.slug;
    if (!snippetIsLoaded(state, snippetId)) {
      return dispatch(loadSnippet(snippetId));
    }
  }

  render() {
    const styles = require('./Snippet.scss');
    const snippetId = this.props.params.slug;
    const snippet = this.props.snippets[snippetId];
    const loading = !snippet || snippet.loading;
    const error = !snippet || snippet.error;

    if (loading) return (<Loader />);
    if (error) return (<Error error={error} />);

    const { category, description, image, landmark, title } = snippet.payload;
    const landmarkId = snippet.payload.landmark_id;

    return (
      <div className={styles.snippet}>
        <div className={styles[`${category}`]}>
          <header className={image ? styles.bannerMini : ''}>
            <div className={styles.background}>
              { image && <Image image={image} size="medium" /> }
            </div>
            <div className={styles.bottomAlign}>
              <h1>{title}</h1>
            </div>
          </header>
          <div className={styles.breadcrumb}>
            <Link to={`/landmark/${landmarkId}`}>← Back to {landmark}</Link>
          </div>
          <section dangerouslySetInnerHTML={{__html: description}} />
        </div>
      </div>
    );
  }
}
