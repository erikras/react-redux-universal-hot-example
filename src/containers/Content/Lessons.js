import React, { Component, PropTypes } from 'react';
// import { Link } from 'react-router';
// import config from '../../config';
import Helmet from 'react-helmet';
import { translate } from 'react-i18next';
import * as lessonActions from 'redux/modules/lesson'; // remove this one
// import {isLoaded, load as loadWidgets} from 'redux/modules/widgets';

import {
  Button
  // ,Pagination,
  ,PageItem
  ,Pager
} from 'react-bootstrap';
import { asyncConnect } from 'redux-async-connect';
import {connect} from 'react-redux';
import ReactHtmlParser
  , { processNodes, convertNodeToElement, htmlparser2 }
from 'react-html-parser';

const { isLoaded, loadLessons } = lessonActions;
import { BlockMath, InlineMath } from 'react-katex';

@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}, params: { id }, location}) => {
    // if (!isLoaded(getState())) {
    //
    // }
    return dispatch(loadLessons());
  }
}])

@connect(
  state => ({
    directions: state.lesson.lessons
  }),
  { ...lessonActions }
)

@translate(['common'])
export default class Lessons extends Component {
  static propTypes = {
    t: PropTypes.func,
    directions:PropTypes.array,
  }



  render() {
    const styles = require('./Home.scss');
    // require the logo image both from client and server
    // const logoImage = require('./logo.png');

    const {
      t
      ,directions
    } = this.props;
    const previousPage = Number(this.props.params.id) > 1 ? Number(this.props.params.id)-1 : Number(this.props.params.id);

    //nextPage needs to be checked by total page (by contents per page)
    //Load contentCount => page = contentCount/10
    //## shoud write an api to check for future uses of mobile???
    //  API:: /contents/pagesCount(with number contents/page)
    const nextPage = Number(this.props.params.id)+1;

    const pagination = (
      <Pager>
        {Number(this.props.params.id) > 1 &&
        <PageItem previous href={`/page/${previousPage}`} onSelect={() => {
          this.props.history.push(`/page/${previousPage}`)
        }}>&larr; {t('content.previous_page')}</PageItem>
        }
        <PageItem next href={`/page/${nextPage}`} onSelect={() => {
          console.log(this.props.params);
          this.props.history.push(`/page/${nextPage}`)
        }}>{t('content.next_page')} &rarr;</PageItem>
      </Pager>
    );

    return (
      <div className={styles.home}>
        <Helmet title="Home"/>

        <div className="container">
          <Button bsStyle="link" onClick={() => this.props.history.push(`/lesson/create`)}>
            {t('content.create_lesson')}
          </Button>
          <Button bsStyle="link" onClick={() => this.props.history.push(`/content/create`)}>
            {t('content.create_content')}
          </Button>
          {pagination}
          <div>
            {
              directions !== undefined &&
                directions.map((item, i) => {
                  // console.log(item);
                  // if (item.active === 1) {
                  //
                  // }
                  return (
                    <div>
                      <b dangerouslySetInnerHTML={{ __html: item.name }} />

                      <Button bsStyle="link" onClick={() => this.props.history.push(`/lesson/${item.id}`)}>
                        {t('content.see_more')}
                      </Button>
                    </div>
                  );
                })
              }
          </div>
          {pagination}
        </div>
      </div>
    );
  }
}
