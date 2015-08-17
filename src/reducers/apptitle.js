import {
  TITLE_META_UPDATE
} from '../actions/actionTypes';

const title = 'React Redux Example';
const description = 'All the modern best practices in one example.';
const image = 'https://react-redux.herokuapp.com/logo.jpg';

const initialState = {
    title,
    description,
    image
};

export default function apptitle(state = initialState, action = {}) {
  switch (action.type) {
    case TITLE_META_UPDATE:
      return {
        ...state,
        title: action.titleObj.title,
        description: action.titleObj.description,
        image: action.titleObj.image
      };
    default:
      return state;
  }
}
