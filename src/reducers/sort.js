import { SORT_TOGGLE } from '../actions/index';

export const sort = (state = {}, { type, fld }) => {
  switch (type) {
    case SORT_TOGGLE:
      if (state.fld === fld) {
        return { fld: state.fld, order: !state.order };
      } else {
        return { fld, order: true };
      }
      //break;
    default:
      return state;
  }
};
