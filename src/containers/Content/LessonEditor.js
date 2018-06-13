import React, { Component, PropTypes } from 'react';
// import { Link } from 'react-router';
// import config from '../../config';
import Helmet from 'react-helmet';
import { translate } from 'react-i18next';
import * as lessonActions from 'redux/modules/lesson'; // remove this one
// import {isLoaded, load as loadWidgets} from 'redux/modules/widgets';
import { withFormik, Formik } from 'formik';

//React > 16.3
// import { DragDropContext
//   ,Droppable, Draggable
// } from 'react-beautiful-dnd';

import {
  Button,
  Checkbox
  // ,Pagination,
  ,PageItem
  ,Pager
} from 'react-bootstrap';
import { asyncConnect } from 'redux-async-connect';
import {connect} from 'react-redux';
import ReactHtmlParser
  , { processNodes, convertNodeToElement, htmlparser2 }
from 'react-html-parser';

import { DirectionSelection, SortableComponent } from 'components';

const { isLoaded, loadContents, loadLessonById, updateContentOrder } = lessonActions;
import { BlockMath, InlineMath } from 'react-katex';

// let beautifulDnD;
// let DragDropContext, Droppable, Draggable;

// import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

// fake data generator
const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

const getAllIndexesOf_PCI =(arr) => { //PCI: previousContentId / check
    var indexes = [], i;
    console.log("length");
    console.log(arr.length);
    for(i = 0; i < arr.length; i++){
      console.log(i);
      console.log(arr[i].previousContentId);
      if (arr[i].previousContentId == 0 || arr[i].previousContentId == null) {
        console.log(arr[i].previousContentId);
        indexes.push(i);
      }
    }

    return indexes;
  }

  const getAllIndexesOf_0Position =(arr) => { //PCI: previousContentId / check that how many '0' position
      var indexes = [], i;
      console.log("length");
      console.log(arr.length);
      for(i = 0; i < arr.length; i++){
        console.log(i);
        console.log(arr[i].position);
        if (arr[i].position == 0 || arr[i].position == null) {
          console.log(arr[i].position);
          indexes.push(i);
        }
      }

      return indexes;
    }

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  //#1: previousContentId = 0 <-- find this one is so easy
  //#2: previousContentId = item[0].id
  //..
  //#n: previousContentId = item[n-1].id

  //Whatif: has no order? like: 2 previousContentId == 0???
  //=> reset all previousContentId to 0?

  //First, check that it has 2 previousContentId = 0 => return original list
  //Then: too many cases


  //
  var length = list.length;
  console.log(length);

  const origin = Array.from(list);
  let result = Array.from(list);


  //find previousContentId = 0
  // var index = origin.findIndex(x => x.previousContentId==0);
  var indexes = getAllIndexesOf_PCI(list);
  console.log(indexes);
  if (indexes.length != 1) {
    console.log("return origin");
    return origin;
  }
  for (var i = 0; i < origin.length; i++) {
    console.log("origin.length");

    console.log(origin[i]);



    if(i == 0) {
      //put to #1 means: 0
      const [removed] = result.splice(result.findIndex(x => x.previousContentId == 0), 1); //1st param: find the order of item that needs to be removed
      result.splice(i, 0, removed);
    } else {
      const [removed] = result.splice(result.findIndex(x => x.previousContentId == result[i-1].id), 1); //1st param: find the order of item that needs to be removed
      result.splice(i, 0, removed);
    }
  }

  /********/
  //finally: check origin.length vs result length
  //If it's the same, then ok, otherwise: return origin
  if (result.length != origin.length) {
    console.log("something wrong???");
    return origin;
  }
  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 ${grid}px 0 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  display: 'flex',
  padding: grid,
  overflow: 'auto',
});

/*******
Form
********/
// Our inner form component. Will be wrapped with Formik({..})
const MyInnerForm = props => {
  const {
    values,
    touched,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    lesson_by_id,
    updateLesson,
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title" style={{ display: 'block' }}>
        Title
      </label>
      <input  type="checkbox" name="active" value="active"
        defaultChecked={lesson_by_id.active}

        onChange={(e) => {
          console.log("changed: " + e.target.checked);
          lesson_by_id.active = e.target.checked;
          //Update by calling api here
          updateLesson(lesson_by_id);


        }}
        /> active
      <input
        id="title"
        placeholder="Enter your title/name"
        type="text"
        value={values.title}
        onChange={handleChange}
        onBlur={handleBlur}
        className={errors.title && touched.title ? 'text-input error' : 'text-input'}
      />
      {errors.title &&
      touched.title && <div className="input-feedback">{errors.title}</div>}

      <button
        type="button"
        className="outline"
        onClick={handleReset}
        disabled={!dirty || isSubmitting}
      >
        Reset
      </button>
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>

    </form>
  );
};

const EnhancedForm = withFormik({
  mapPropsToValues: () => ({ title: '' }),
  // validationSchema: Yup.object().shape({
  //   email: Yup.string()
  //     .email('Invalid email address')
  //     .required('Email is required!'),
  // }),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.onChange(values);
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  },
  displayName: 'BasicForm', // helps with React DevTools
})(MyInnerForm);

@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}, params: { id }, location}) => {
    // return dispatch(loadContents(id));

    const promises = [];

    const lessonId = id;
    promises.push(dispatch(loadContents(lessonId)));
    promises.push(dispatch(loadLessonById(lessonId)));

    // return dispatch(loadWidgets());

    return Promise.all(promises)
  }
}])

@connect(
  state => ({
    contents_by_lesson: state.lesson.contents_by_lesson,
    lesson_by_id: state.lesson.lesson_by_id
  }),
  { ...lessonActions }
)


@translate(['common'])
export default class LessonEditor extends Component {
  static propTypes = {
    t: PropTypes.func,
    contents_by_lesson:PropTypes.array,
  }

  componentDidMount() {
    // { DragDropContext, Droppable, Draggable } = require('react-beautiful-dnd');
  }

  render() {
    const styles = require('./Home.scss');
    // require the logo image both from client and server
    // const logoImage = require('./logo.png');

    const {
      t
      ,contents_by_lesson
      ,lesson_by_id
    } = this.props;
    const previousPage = Number(this.props.params.id) > 1 ? Number(this.props.params.id)-1 : Number(this.props.params.id);

    //nextPage needs to be checked by total page (by contents per page)
    //Load contentCount => page = contentCount/10
    //## shoud write an api to check for future uses of mobile???
    //  API:: /contents/pagesCount(with number contents/page)
    const nextPage = Number(this.props.params.id)+1;

    //Sort contents_by_lesson by the order
    let contentsForGood = [];
    for (var i in contents_by_lesson) {

    }

    return (
      <div className={styles.home}>
        <Helmet title="Home"/>

        <div className="container">
          <div>
            <br/>


            {
              contents_by_lesson !== undefined &&
                <SortableComponent
                  content={reorder(contents_by_lesson)}
                  onChange={(data) => {
                    console.log("list changed");
                    console.log(data);

                    //Update the order to server
                    // promise.all or async.each ?? or a new mysql query
                    //Have to remove redundant data
                    //Has only id + previousContentId

                    //Breaking change: use 'position' instead
                    let contentOrderData = []; //What's this?
                    for (var i = 0; i < data.length; i++) {
                      console.log(data[i]);
                      contentOrderData.push({
                        id: data[i].id,
                        // previousContentId: data[i].previousContentId,
                        position: i

                      })
                    }
                    console.log(contentOrderData);

                    //Breaking change: update content order by position
                    this.props.updateContentOrder(contentOrderData);
                  }}
                  />
            }
            {

              <div style={{height: 30}}>

              </div>
            }

            <p>{t('content.choose_direction')}</p>
            <DirectionSelection onChange={(data) => {
                console.log("got cha, direction!!");
                console.log(data);
                this.setState({
                  directionValue: data,
                });
              }}/>

              { this.state && this.state.directionValue &&
                  <Button onClick={() => {
                      console.log("onclick");
                      console.log(this.state.directionValue);

                      //EDIT content, change directionId
                      lesson_by_id.directionsId = this.state.directionValue.id;
                      //
                      this.props.updateLesson(lesson_by_id);
                    }}>Save</Button>
                //   <Button onClick={() => {
                //
                //   }}>
                //   {t('content.save_content_to_lesson')}
                // </Button>
              }
            {
              contents_by_lesson !== undefined &&
                contents_by_lesson.map((item, i) => {
                  // console.log(item);
                  if (item.active === 1) {
                    return (
                      <div>
                        <b dangerouslySetInnerHTML={{ __html: item.id }} />
                        <b dangerouslySetInnerHTML={{ __html: item.name }} />
                          <Button bsStyle="link" onClick={() => this.props.history.push(`/content/${item.id}/edit`)}>
                            {t('content.editContent')}
                          </Button>
                        {

                        }
                        {
                        //   <Button bsStyle="link" onClick={() => this.props.history.push(`/content/${item.id}`)}>
                        //   {t('content.see_more')}
                        // </Button>
                        }
                      </div>
                    );
                  }
                })
              }
          </div>
          {
            lesson_by_id && <EnhancedForm {...this.props}/>
          }
        </div>
      </div>
    );
  }
}
