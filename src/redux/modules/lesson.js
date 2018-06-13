const LOAD = 'LESSON/LESSON/LOAD';
const SUCCESS = 'LESSON/LESSON/SUCCESS';
const FAIL = 'LESSON/LESSON/FAIL';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case SUCCESS:
      console.log('yup!!');
      return {
        ...state,
        loading: false,
        loaded: true,
        // accessToken: action.result.accessToken.id,
        data: action.result
      };
    case FAIL:
      console.log(action.error);
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      };
    case "LESSONS_SUCCESS":
      return {
        ...state,
        loading: false,
        loaded: true,
        // accessToken: action.result.accessToken.id,
        lessons: action.result
      };
    case "LOAD_MY_LESSONS_SUCCESS":
      return {
        ...state,
        loading: false,
        loaded: true,
        // accessToken: action.result.accessToken.id,
        lessons: action.result
      };
    case "LESSONS_FIRST_CONTENT_SUCCESS":
      return {
        ...state,
        loading: false,
        loaded: true,
        // accessToken: action.result.accessToken.id,
        lessons_first_content: action.result
      };
    case "CONTENTS_BY_LESSON_SUCCESS":
      return {
        ...state,
        loading: false,
        loaded: true,
        // accessToken: action.result.accessToken.id,
        contents_by_lesson: action.result
      };
    case "LESSONS_BY_NAME_SUCCESS":
      return {
        ...state,
        loading: false,
        loaded: true,
        // accessToken: action.result.accessToken.id,
        lessons_by_name: action.result
      };
    case "LESSON_BY_ID_SUCCESS":
      return {
        ...state,
        loading: false,
        loaded: true,
        // accessToken: action.result.accessToken.id,
        lesson_by_id: action.result
      };
    default:
      return state;
  }
}

/*
* Actions
* * * * */
export function isLoaded(globalState) {
  return globalState.lesson && globalState.lesson.loaded;
}

export function loadContents(lessonId) {
  // return dispatch =>
  //   dispatch({
  //     types: [LOAD],
  //     promise: ({oneClient}) => oneClient.get('/directions')
  //   })
  const mFilter = {
    where: {
      lessonsId: lessonId
      ,publish: 1
    }
    // ,fields: {
    //   id:true,
    //   name:true,
    //   parentContentId:true,
    //   previousContentId :true
    // }
    ,order: "position asc"
  };
  console.log('loadContents by lesson');
  return {
    types: ["CONTENTS_BY_LESSON_LOAD", "CONTENTS_BY_LESSON_SUCCESS", "CONTENTS_BY_LESSON_FAIL"],
    promise: ({ oneApiClient }) =>
      oneApiClient.get('/contents'
        ,{
          params: {
              filter: JSON.stringify(mFilter)
          }
        }
      ) //
  };
}

export function loadLessons() {
  const mFilter = {
    // where: {
    //   lessonsId: lessonId
    //   ,publish: 1
    // }
    // ,fields: {
    //   id:true,
    //   name:true,
    //   parentContentId:true,
    //   previousContentId :true
    // }
    // ,order: "lastUpdated desc"
  };
  // console.log('loadContents by lesson');
  return {
    types: ["LESSONS_LOAD", "LESSONS_SUCCESS", "LESSONS_FAIL"],
    promise: ({ oneApiClient }) =>
      oneApiClient.get('/lessons'
        ,{
          params: {
              filter: JSON.stringify(mFilter)
          }
        }
      ) //
  };
}

export function loadMyLessons() {
  const mFilter = {
    // where: {
    //   lessonsId: lessonId
    //   ,publish: 1
    // }
    // ,fields: {
    //   id:true,
    //   name:true,
    //   parentContentId:true,
    //   previousContentId :true
    // }
    // ,order: "lastUpdated desc"
  };
  // console.log('loadContents by lesson');
  return {
    types: ["LOAD_MY_LESSONS_LOAD", "LOAD_MY_LESSONS_SUCCESS", "LOAD_MY_LESSONS_FAIL"],
    promise: ({ oneApiClient }) =>
      oneApiClient.get('/lessons'
        ,{
          params: {
              filter: JSON.stringify(mFilter)
          }
        }
      ) //
  };
}

export function loadLessonsByName(name) {
  const mFilter = {
    limit: 10,
    where: {
      name: {
        like: '%' + name + '%'
      }
    }
    // ,fields: {
    //   id:true,
    //   name:true,
    //   parentContentId:true,
    //   previousContentId :true
    // }
    // ,order: "lastUpdated desc"
  };
  // console.log('loadContents by lesson');
  return {
    types: ["LESSONS_BY_NAME_LOAD", "LESSONS_BY_NAME_SUCCESS", "LESSONS_BY_NAME_FAIL"],
    promise: ({ oneApiClient }) =>
      oneApiClient.get('/lessons'
        ,{
          params: {
              filter: JSON.stringify(mFilter)
          }
        }
      ) //
  };
}

export function createLesson(name) {
  const data = {
    id: 0,
    name: name,
    active: 1,
    showCatalog: 1
  };
  // console.log('loadContents by lesson');
  return {
    types: ["CREATE_LESSON_LOAD", "CREATE_LESSON_SUCCESS", "CREATE_LESSON_FAIL"],
    promise: ({ oneApiClient }) =>
      oneApiClient.post('/lessons'
        ,{
          data : data
        }
      ) //
  };
}


export function loadDirections(name) {
  const mFilter = {
    limit: 10,
    where: {
      name: {
        like: '%' + name + '%'
      }
    }

  };
  // console.log('loadContents by lesson');
  return {
    types: ["DIRECTIONS_LOAD", "DIRECTIONS_SUCCESS", "DIRECTIONS_FAIL"],
    promise: ({ oneApiClient }) =>
      oneApiClient.get('/directions'
        ,{
          params: {
              filter: JSON.stringify(mFilter)
          }
        }
      ) //
  };
}

export function loadLessonById(id) {
  // return dispatch =>
  //   dispatch({
  //     types: [LOAD],
  //     promise: ({oneClient}) => oneClient.get('/directions')
  //   })
  console.log('Load lesson by ID');
  return {
    types: ["LESSON_BY_ID_LOAD", "LESSON_BY_ID_SUCCESS", "LESSON_BY_ID_FAIL"],
    promise: ({ oneApiClient }) =>
      oneApiClient.get('/lessons/' + id
        // ,{
        //   params: {
        //     userId,
        //     accessToken
        //   }
        // }
      ) //
  };
}


export function updateLesson(data) {
  return {
    types: ["UPDATE_CONTENT_LOAD", "UPDATE_CONTENT_SUCCESS", "UPDATE_CONTENT_FAIL"],
    promise: ({ oneApiClient }) =>
      oneApiClient.put('/lessons'
        ,{
          data : data
        }
      ) //
  };
}

export function updateContentOrder(data) {
  // const data = {
  //   id: 0,
  //   name: name,
  //   active: 1,
  //   showCatalog: 1
  // };
  // console.log('loadContents by lesson');
  return {
    types: ["UPDATE_CONTENT_ORDER_LOAD", "UPDATE_CONTENT_ORDER_SUCCESS", "UPDATE_CONTENT_ORDER_FAIL"],
    promise: ({ oneApiClient }) =>
      oneApiClient.post('/contents/updatePosition'
        ,{
          data : data
        }
      ) //
  };
}

export function loadLessonsWithFirstContent() {
  const mFilter = {
    // where: {
    //   lessonsId: lessonId
    //   ,publish: 1
    // }
    // ,fields: {
    //   id:true,
    //   name:true,
    //   parentContentId:true,
    //   previousContentId :true
    // }
    // ,order: "lastUpdated desc"
  };
  // console.log('loadContents by lesson');
  return {
    types: ["LESSONS_FIRST_CONTENT_LOAD", "LESSONS_FIRST_CONTENT_SUCCESS", "LESSONS_FIRST_CONTENT_FAIL"],
    promise: ({ oneApiClient }) =>
      oneApiClient.get('/lessons/withContent'
        ,{
          params: {
              filter: JSON.stringify(mFilter)
          }
        }
      ) //
  };
}
