import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { CounterButton, GithubButton, Sections, SortableDisabled } from 'components';
import config from 'config';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import reducer, * as contentActions from 'redux/modules/content'; // remove this one
// import { provideHooks } from 'redial';

import { asyncConnect } from 'redux-async-connect';

const { isLoaded, loadContent, loadWithOtherContentIds } = contentActions;
// import 'katex/dist/katex.min.css';
// require('katex/dist/katex.min.css');
import { BlockMath, InlineMath, InlineMath as inlinemath } from 'react-katex';
import ReactDOM from 'react-dom';
import ReactHtmlParser
  , { processNodes, convertNodeToElement, htmlparser2 }
from 'react-html-parser';
import { translate } from 'react-i18next';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


import {
  Button
  // ,Pagination,
  // ,PageItem
  // ,Pager
} from 'react-bootstrap';

@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}, params: { id }, location}) => {
    // console.log("asyncConnect");
    // if (!isLoaded(getState())) {
    // }
    //Should check to be different!!!
    return dispatch(loadWithOtherContentIds(id));
  }
}])

// @provideHooks({
//   fetch: ({ store: { dispatch, inject, getState }, params: { id }, location }) => {
//     inject({ home: reducer });
//
//     return dispatch(loadContent(id)).catch(() => null);
//   }
// })
@connect(
  state => ({
    content: state.content.data
    // editing: state.widgets.editing,
    // error: state.widgets.error,
    // loading: state.widgets.loading
  }),
  { ...contentActions }
)
// @connect(state => ({
//   online: state.online
// }))
@translate(['common'])
export default class Content extends Component {
  static propTypes = {
    content: PropTypes.object
  };

  componentDidMount() {
    // require('katex/dist/katex.min.css');
    // this.forceUpdate();
  }

  transform(node, index) {
    // convert <ul> to <ol>
    if (node.type === 'tag' && node.name === 'inlinemath') {
      node.name = 'InlineMath';
      return convertNodeToElement(node, index, transform);
    }
  }

  render() {

    // require('../../theme/katex.css');
    const { t, content } = this.props;
    const styles = require('./Home.scss');
    // require the logo image both from client and server
    const logoImage = require('./logo.png');

    // console.log("AAAAAAAA");
    // console.log(content);
    return (
      <div className={styles.home}>
        <Helmet title={content ? (content.lesson ? content.lesson.name: "Content") : "Content" } />
        <div className="container">
          <br/>
            {
              // content &&
              // <Button bsStyle="link" onClick={() => this.props.history.push(`/content/${content.id}/edit`)}>
              //   {t('content.editContent')}
              // </Button>
            }
          <div>{
            // <Sections/>
            // if(content)
            // {
            //   const what = content.data.match(/\\\(([\s\S]*?)\\\)/gi)
            //   console.log(what)
            // }
            // content ? console.log(content.data.match(/\\\(([\s\S]*?)\\\)/gi)) : null
          }</div>
        {
          content && content.lesson && <h1>{content.lesson.name}</h1>
        }
        { content && content.lesson &&
            <SortableDisabled
              content={content}
              onChange={(position) => {
                // console.log("list changed");
                console.log(position);

                //Get contentId by position...
                this.props.history.push(`/content/${content.lesson.contents[position].id}`)
            }}
            />
        }
          {content.active && (
            <div>
              <b dangerouslySetInnerHTML={{ __html: content.name }} />
              <div>{content &&  ReactHtmlParser(content.data, {decodeEntities: true, transform: (node, index) => {
                  if (node.type === 'tag' && node.name === 'span' && node.attribs.class === "math-q") {
                    // node.name = 'InlineMath';
                    // console.log("what");
                    // console.log(node);
                    // console.log(index);
                    return <InlineMath math={node.children[0].data.slice(2,-2)} />;
                  }

                  //Find image tag: <span><img src=\"content/lessons/28/obitan_1.PNG\" /></span>
                  if (node.type === 'tag' && node.name === 'img') {
                    // console.log(node);
                    if (node.attribs.src.startsWith('content/lessons/')) {
                      // console.log("matchedddd.....");
                      var newSrc = 'http://hochochoc.com/www/' + node.attribs.src; //should be dynamic.... by using env...

                      return <img src={newSrc} />;
                    }
                  }
                }})}</div>
              <el/>
            </div>
          )}
          {/*
              <div className={styles.counterContainer}>
                <CounterButton multireducerKey="counter1" />
                <CounterButton multireducerKey="counter2" />
                <CounterButton multireducerKey="counter3" />
              </div>
              */}
        </div>
      </div>
    );
  }
}
