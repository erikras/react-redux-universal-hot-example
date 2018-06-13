import React, { Component, PropTypes } from 'react';
// import { Link } from 'react-router';
// import config from '../../config';
import Helmet from 'react-helmet';
import { translate } from 'react-i18next';
import * as lessonActions from 'redux/modules/lesson'; // remove this one
// import {isLoaded, load as loadWidgets} from 'redux/modules/widgets';

import { CreateLesson as CreateLessonComponent } from 'components';
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

const { isLoaded, loadLessons, createLesson } = lessonActions;
import { BlockMath, InlineMath } from 'react-katex';

@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}, params: { id }, location}) => {
    if (!isLoaded(getState())) {
      return dispatch(loadLessons());
    }
  }
}])

@connect(
  state => ({
    directions: state.lesson.data
  }),
  { ...lessonActions }
)

@translate(['common'])
export default class CreateLesson extends Component {
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



    return (
      <div className={styles.home}>
        <Helmet title="Home"/>

        <div className="container">
          <br/>
          <CreateLessonComponent onChange={(data) => {
              console.log("title");
              console.log(data.title);

              this.props.createLesson(data.title);
              //Call rest api to add/edit lesson here
            }}/>

          <Button onClick={() => {

            }}>
            {t('content.save')}
          </Button>
          <div>
            {
              directions !== undefined &&
                directions.map((item, i) => {
                  // console.log(item);
                  if (item.active === 1) {
                    return (
                      <div>
                        <b dangerouslySetInnerHTML={{ __html: item.name }} />

                        <Button bsStyle="link" onClick={() => this.props.history.push(`/lesson/${item.id}`)}>
                          {t('lesson.see_more')}
                        </Button>
                      </div>
                    );
                  }
                })
              }
          </div>
        </div>
      </div>
    );
  }
}
