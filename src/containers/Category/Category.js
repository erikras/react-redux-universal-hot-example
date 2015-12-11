import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';
import {connect} from 'react-redux';
import * as categorySnippetActions from 'redux/modules/categorySnippets';
import { snippetsAreLoaded, loadSnippets } from 'redux/modules/categorySnippets';
import { Error, PaperLoader, CategorySnippetsList } from 'components';
import * as _ from 'lodash';

@connect(
  state => ({
    snippets: state.categorySnippets,
  }),
  {...categorySnippetActions})

export default
class Category extends Component {
  static propTypes = {
    activeNavItem: PropTypes.func,
    changeHeader: PropTypes.func,
    snippets: PropTypes.object,
    location: PropTypes.object,
    params: PropTypes.object
  }

  componentDidMount() {
    this.props.activeNavItem('more');
    this.tryUpdateHeader();
  }

  componentDidUpdate() {
    this.tryUpdateHeader();
  }

  tryUpdateHeader() {
    const categoryId = this.props.params.id;
    const categorySnippets = this.props.snippets[categoryId] && this.props.snippets[categoryId].payload;
    if (categorySnippets) {
      const category = _.capitalize(categorySnippets[0].category);
      this.props.changeHeader(category);
    }
  }

  static fetchDataDeferred(getState, dispatch) {
    const state = getState();
    const categoryId = state.router.params.id;
    if (!snippetsAreLoaded(getState(), categoryId)) {
      return dispatch(loadSnippets(categoryId));
    }
  }

  render() {
    const categoryId = this.props.params.id;
    const snippets = this.props.snippets[categoryId];
    const loading = !snippets || snippets.loading;
    const error = !snippets || snippets.error;
    if (loading) return (<PaperLoader />);
    if (error) return (<Error error={error} />);
    const categorySnippets = snippets.payload;

    return (
      <div>
        <DocumentMeta title="Explore the MSD" extend/>
        { loading ? <PaperLoader /> : <CategorySnippetsList items={categorySnippets} /> }
      </div>
    );
  }
}

