import {
  TITLE_META_UPDATE
} from '../actions/actionTypes';

import {initTitle, initDescription, initImage} from '../components/AppTitle';

const initialState = {
    title: initTitle,
    description: initDescription,
    image: initImage
};

export default function apptitle(state = initialState, action = {}) {
  switch (action.type) {
    case TITLE_META_UPDATE:
      return {
        ...state,
        title: action.titleObj.title || initTitle,
        description: action.titleObj.description || initDescription,
        image: action.titleObj.image || initImage
      };
    default:
      return state;
  }
}
