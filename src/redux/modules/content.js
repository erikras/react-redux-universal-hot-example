const LOAD = 'CONTENT/CONTENT/LOAD';
const SUCCESS = 'CONTENT/CONTENT/SUCCESS';
const FAIL = 'CONTENT/CONTENT/FAIL';

const initialState = {
  loaded: false,
  data: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        // accessToken: action.result.accessToken.id,
        data: action.result
      };
    case FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: {},
        error: action.error
      };
    case "CONTENT_LESSON_CONTENTS_SUCCESS":
      return {
        ...state,
        loading: false,
        loaded: true,
        // accessToken: action.result.accessToken.id,
        data: action.result
      };
    default:
      return state;
  }
}

/*
* Actions
* * * * */
export function isLoaded(globalState) {
  return globalState.content && globalState.content.loaded;
}

export function loadContent(id) {
  // return dispatch =>
  //   dispatch({
  //     types: [LOAD],
  //     promise: ({oneClient}) => oneClient.get('/directions')
  //   })
  console.log('loadContents');
  return {
    types: [LOAD, SUCCESS, FAIL],
    promise: ({ oneApiClient }) =>
      oneApiClient.get('/contents/' + id
        // ,{
        //   params: {
        //     userId,
        //     accessToken
        //   }
        // }
      ) //
  };
}


export function updateContent(data) {
  // const data = {
  //   id: 0,
  //   name: name,
  //   active: 0,
  //   showCatalog: 0
  // };
  // console.log('loadContents by lesson');
  return {
    types: ["UPDATE_CONTENT_LOAD", "UPDATE_CONTENT_SUCCESS", "UPDATE_CONTENT_FAIL"],
    promise: ({ oneApiClient }) =>
      oneApiClient.put('/contents'
        ,{
          data : data
        }
      ) //
  };
}

export function loadWithOtherContentIds(id) {
  const mFilter = {
    where: {
      id: id
    },
    include: {
      relation: 'lesson',
      scope: {
        include: [
          {
            relation: 'contents',
            scope: {
              fields: {
                id: true,
                position: true
              },
              order: 'position asc'
            }
          }
        ]
      }
    }

  }
  return {
    types: ["CONTENT_LESSON_CONTENTS_LOAD", "CONTENT_LESSON_CONTENTS_SUCCESS", "CONTENT_LESSON_CONTENTS_FAIL"],
    promise: ({ oneApiClient }) =>
      oneApiClient.get('/contents/findOne'
        ,{
          params: {
              filter: JSON.stringify(mFilter)
          }
        }
      ) //
  };
}
