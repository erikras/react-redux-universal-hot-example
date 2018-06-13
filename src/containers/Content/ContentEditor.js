import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { CounterButton, GithubButton, Sections
  ,LessonSelection
  , TextEditor
} from 'components';
import config from 'config';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import reducer, * as contentActions from 'redux/modules/content'; // remove this one
// import { provideHooks } from 'redial';

import { asyncConnect } from 'redux-async-connect';

const { isLoaded, loadContent, updateContent } = contentActions;
// import 'katex/dist/katex.min.css';
// require('katex/dist/katex.min.css');
import { BlockMath, InlineMath, InlineMath as inlinemath } from 'react-katex';
import ReactDOM from 'react-dom';
import ReactHtmlParser
  , { processNodes, convertNodeToElement, htmlparser2 }
from 'react-html-parser';

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
    console.log("hey");
    if (id !== undefined && id !== null) {
      console.log("has no id");

    }
    return dispatch(loadContent(id));

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
export default class ContentEditor extends Component {
  static propTypes = {
    content: PropTypes.object
  };

  componentDidMount() {
    // require('katex/dist/katex.min.css');
    this.forceUpdate();
  }

  transform(node, index) {
    // convert <ul> to <ol>
    if (node.type === 'tag' && node.name === 'inlinemath') {
      node.name = 'InlineMath';
      return convertNodeToElement(node, index, transform);
    }
  }

  handleTextareaChange(event) {
    console.log("changing...");
    if (!this.props.content.id) {
      this.props.content.id = 0;
    }
    if(!this.props.content.name) {
      this.props.content.name = "";
    }
    if(!this.props.content.ctgType) {
      this.props.content.ctgType = "theory";
    }
    this.props.content.data = event.target.value;
    this.forceUpdate();
  }

  render() {

    // require('../../theme/katex.css');
    const { content } = this.props;
    const styles = require('./Home.scss');
    // require the logo image both from client and server
    const logoImage = require('./logo.png');

    return (
      <div className={styles.home}>
        <Helmet title="Content" />
        <div className="container">
          <br/>
          <p>Change lessson</p>
          <LessonSelection
            onChange={(data) => {
              console.log("got cha!!");
              console.log(data);
              this.setState({
          			lessonValue: data,
          		});
            }}
            />
          { this.state && this.state.lessonValue &&
              <Button onClick={() => {
                  console.log("onclick");
                  console.log(this.state.lessonValue);

                  //EDIT content, change lessonId
                  content.lessonsId = this.state.lessonValue.id;

                  this.props.updateContent(content);
                }}>Save</Button>
            //   <Button onClick={() => {
            //
            //   }}>
            //   {t('content.save_content_to_lesson')}
            // </Button>
          }
          { false && content && // Ideas: create multiple editor to switch between modes,
            // and of course, pure mode: for editing Html purely.
            // prevent losing data.... at first place.
              <TextEditor content={content.data} />

          }
          <textarea
            value={content? content.data : ""}
            onChange={this.handleTextareaChange.bind(this)}/>

          <div>
            <Button onClick={() => {
                console.log("save content");
                console.log(content.data);


                //EDIT content, change lessonId
                // content.data = this.state.lessonValue.id;

                this.props.updateContent(content);
              }}>Save the content </Button>
          </div>


          <div>{
            // <Sections/>
            // if(content)
            // {
            //   const what = content.data.match(/\\\(([\s\S]*?)\\\)/gi)
            //   console.log(what)
            // }
            // content ? console.log(content.data.match(/\\\(([\s\S]*?)\\\)/gi)) : null
          }</div>
        {content && content.active && (
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
