import {
  TITLE_META_UPDATE
} from '../actions/actionTypes';

export function updateTitleObj(titleObj = {}) {
  return {
    type: TITLE_META_UPDATE,
    titleObj
  };
}
