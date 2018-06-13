const LOAD = 'home/CONTENTPAGE/LOAD';
const SUCCESS = 'home/CONTENTPAGE/SUCCESS';
const FAIL = 'home/CONTENTPAGE/FAIL';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SUCCESS:
      console.log('yup!!');
      return {
        ...state,
        loading: false,
        loaded: false,
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
  return globalState.contentPage && globalState.contentPage.loaded;
}

export function loadContents(pnum) {
  // return dispatch =>
  //   dispatch({
  //     types: [LOAD],
  //     promise: ({oneClient}) => oneClient.get('/directions')
  //   })

  //page 1: from 1 -> 10 (1-1)*10+1
  //page 2: from 11 ->20 (2-1)*10+1
  //...
  const offset = (pnum-1)*10+1
  const mFilter = {
    skip: offset - 1,
    limit: 10,
    where: {
      active: 1
    },
    order: "lastUpdated desc"
  };
  console.log('loadContents');
  return {
    types: [LOAD, SUCCESS, FAIL],
    promise: ({client, oneApiClient}) =>
      oneApiClient.get('/contents'
        ,{
          params: {
              filter: JSON.stringify(mFilter)
          }
        }
      ) //
  };
}
