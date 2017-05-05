import { EDIT_PROMPT, EDIT_VALUE, EDIT_ID, EDIT_CLEAR } from '../actions/index';

export const editx = (state = {}, { type, id, fld, value }) => {
  console.log('here',{type, id, fld, value} );

  switch (type) {
    case EDIT_PROMPT:
      return { ...state, id, fld };
    case EDIT_VALUE:
      return { ...state, id, fld, value };
    case EDIT_ID:
      return { id };
    case EDIT_CLEAR:
      return {};
    default:
      return state;
  }
};

export const edit = (state = {}, action) => {

  switch (action.type) {
    case EDIT_PROMPT:
      return { ...state, id: action.id, fld: action.fld };
    case EDIT_VALUE:
      return { ...state, id: action.id, fld: action.fld, value: action.value };
    case EDIT_ID:
      return { id: action.id };
    case EDIT_CLEAR:
      return {};
    default:
      return state;
  }
};
