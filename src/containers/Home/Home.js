import React, { Component, PropTypes } from 'react';
// import { Link } from 'react-router';
// import config from '../../config';
import Helmet from 'react-helmet';
import { translate } from 'react-i18next';
import * as homeActions from 'redux/modules/home'; // remove this one
import * as lessonActions from 'redux/modules/lesson';
// import {isLoaded, load as loadWidgets} from 'redux/modules/widgets';

import {
  Button
  // ,Pagination,
  ,PageItem
  ,Pager
} from 'react-bootstrap';
import { asyncConnect } from 'redux-async-connect';
import {connect} from 'react-redux';

// import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';
import ReactHtmlParser
  , { processNodes, convertNodeToElement, htmlparser2 }
from 'react-html-parser';

import Select from 'react-select';

const { isLoaded, loadContents } = homeActions;
const { loadLessonsWithFirstContent } = lessonActions;

@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    // console.log("asyncConnect");
    if (!isLoaded(getState())) {
      // console.log("not in here?");
      return dispatch(loadLessonsWithFirstContent());
    }
  }
}])

@connect(
  state => ({
    directions: state.home.data,
    lessons_first_content: state.lesson.lessons_first_content
  }),
  { ...homeActions, lessonActions  }
)

@translate(['common'])
export default class Home extends Component {
  static propTypes = {
    t: PropTypes.func,
    directions: PropTypes.array,
  }

  state = {
    selectedOption: '',
  }
  // componentDidMount() {
  //   // require('katex/dist/katex.min.css');
  //   // this.forceUpdate();
  //   const _SortableTree = require('react-sortable-tree').default;
  //
  // }

  componentDidMount() {
    this._ismounted = true;
  }

  componentWillUnmount() {
     this._ismounted = false;
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
		// selectedOption can be null when the `x` (close) button is clicked
		if (selectedOption) {
    	console.log(`Selected: ${selectedOption.label}`);
		}
  }

  render() {
    const styles = require('./Home.scss');
    const { selectedOption } = this.state;
    // console.log("stylessss....");
    // console.log(styles);
    // require('katex/dist/katex.min.css');
    // require('../../theme/katex.scss');
    // require('./katex.scss');
    // require the logo image both from client and server
    // const logoImage = require('./logo.png');

    const {
      t
      ,directions,
      lessons_first_content
    } = this.props;

    const initialData = [
      { id: '1', name: 'N1', parent: null },
      { id: '2', name: 'N2', parent: null },
      { id: '3', name: 'N3', parent: 2 },
      { id: '4', name: 'N4', parent: 3 },
    ];
    // let _SortableTree;

    // Update to React > 15.3 to use
    // if (this._ismounted) {
    //   // const _SortableTree = require('react-sortable-tree').default;
    //   const SortableTree = require('react-sortable-tree').default;
    //   return (<SortableTree
    //     treeData={initialData} />);
    // }
    // else {
    //   return (<div></div>)
    // }


    return (
      <div className={styles.home}>
        <Helmet title="Home"/>

        <div className="container">
          {
            // <Button bsStyle="link" onClick={() => this.props.history.push(`/lessons`)}>
            // {t('content.all_lessons')}
            // </Button>
          }
          {
            // <Pager>
            //   <PageItem next onSelect={() => this.props.history.push(`/page/2`)} href="/page/2" >{t('content.next_page')} &rarr;</PageItem>
            // </Pager>
          }
          <div>
            {
              lessons_first_content !== undefined &&
                lessons_first_content.map((item, i) => {
                  // console.log(item);
                  if (item.active === 1) {
                    return (
                      <div>
                        <b dangerouslySetInnerHTML={{ __html: item.name }} /><span>  </span>
                          <Button href={`/content/${item.firstContentId}`} bsStyle="link" onClick={(e) => {
                                e.preventDefault();
                                this.props.history.push(`/content/${item.firstContentId}`)}
                              }>
                            {t('content.see')}
                          </Button>
                      </div>
                    );
                  }
                })
              }
          </div>
          {
              // <Pager>
              //   <PageItem next onSelect={() => this.props.history.push(`/page/2`)} href="/page/2" >{t('content.next_page')} &rarr;</PageItem>
              // </Pager>
          }
        </div>
      </div>
    );
  }
}
