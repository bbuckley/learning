import {
  EDIT_PROMPT,
  EDIT_VALUE,
  EDIT_ID,
  EDIT_CLEAR,
  EDIT_DELETE,
  EDIT_SAMPLE
} from '../actions/index';

import { samples } from '../samples';

import firebase, { FIRE_NAME } from '../base';

export const edit = (state = {}, { type, id, fld, value }) => {
  switch (type) {
    case EDIT_SAMPLE:
      const n = 10;
      const s = samples(n);
      s.forEach(s => {
        console.log(s);
        firebase.database().ref(FIRE_NAME).push(s);
      });
      return state;
    case EDIT_PROMPT:
      return { ...state, id, fld: fld };
    case EDIT_VALUE:
      //console.log('save to firebase');
      firebase
        .database()
        .ref(FIRE_NAME + '/' + id + '/')
        .update({ [fld]: value });
      return { id };
    //return { ...state, id, fld, value };
    case EDIT_ID:
      return { id };
    case EDIT_CLEAR:
      return {};
    case EDIT_DELETE:
      // should remove ids in state...
      if (id === null || id === '') {
        console.log('id is null');
        return state;
      }
      firebase.database().ref(FIRE_NAME + '/' + id).remove();
      return state;
    default:
      return state;
  }
};
