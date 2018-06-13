const LOAD = 'home/SECTION/LOAD';
const SUCCESS = 'home/SECTION/SUCCESS';
const FAIL = 'home/SECTION/FAIL';

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
  return globalState.home && globalState.home.loaded;
}

export function loadContents() {
  // return dispatch =>
  //   dispatch({
  //     types: [LOAD],
  //     promise: ({oneClient}) => oneClient.get('/directions')
  //   })
  const mFilter = {
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
