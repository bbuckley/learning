import { EDIT_PROMPT, EDIT_VALUE, EDIT_ID, EDIT_CLEAR } from '../actions/index';

export const edit = (state = {}, { type, id, field, value }) => {
  switch (type) {
    case EDIT_PROMPT:
      return { ...state, id, field };
    case EDIT_VALUE:
      return { ...state, id, field, value };
    case EDIT_ID:
      return { id };
    case EDIT_CLEAR:
      return {};
    default:
      return state;
  }
};
