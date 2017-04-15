
import { SET_FIELD } from '../action/index'

export const edit = (state = { field: '' }, {type, id, field}) => {
  switch (type) {
    case SET_FIELD:
      return { id, field }:
    default:
      return state;
  }
};
