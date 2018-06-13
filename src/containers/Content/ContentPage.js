import React, { Component, PropTypes } from 'react';
// import { Link } from 'react-router';
// import config from '../../config';
import Helmet from 'react-helmet';
import { translate } from 'react-i18next';
import * as contentPageActions from 'redux/modules/contentPage'; // remove this one
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

const { isLoaded, loadContents } = contentPageActions;
import { BlockMath, InlineMath } from 'react-katex';

@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}, params: { id }, location}) => {
    if (!isLoaded(getState())) {
      return dispatch(loadContents(id));
    }
  }
}])

@connect(
  state => ({
    directions: state.contentPage.data
  }),
  { ...contentPageActions }
)

@translate(['common'])
export default class ContentPage extends Component {
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
          {pagination}
          <div>
            {
              directions !== undefined &&
                directions.map((item, i) => {
                  // console.log(item);
                  if (item.active === 1) {
                    return (
                      <div>
                        <b dangerouslySetInnerHTML={{ __html: item.name }} />
                        <div>{item &&  ReactHtmlParser(item.data, {decodeEntities: true, transform: (node, index) => {
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
                        <Button bsStyle="link" onClick={() => this.props.history.push(`/content/${item.id}`)}>
                          {t('content.see_more')}
                        </Button>
                      </div>
                    );
                  }
                })
              }
          </div>
          {pagination}
        </div>
      </div>
    );
  }
}
