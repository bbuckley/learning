import { EDIT_PROMPT, EDIT_VALUE, EDIT_ID, EDIT_CLEAR } from '../actions/index';
import firebase, { FIRE_NAME } from '../base';

export const edit = (state = {}, { type, id, fld, value }) => {

  switch (type) {
    case EDIT_PROMPT:
      return { ...state, id, fld: fld };
    case EDIT_VALUE:
      //console.log('save to firebase');
      firebase
        .database()
        .ref(FIRE_NAME + '/' + id + '/')
        .update({ [fld]: value });
      return { ...state, id, fld, value };
    case EDIT_ID:
      return { id };
    case EDIT_CLEAR:
      return {};
    default:
      return state;
  }
};
