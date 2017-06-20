import { PERSONAL_EDIT, PERSONAL_PTAG_ALL } from '../actions/index';

export const personal = (state = [], { type, fld, id, ids, value }) => {
  switch (type) {
    case PERSONAL_EDIT:
      const i = state.findIndex(x => x.id === id);
      if (i === -1) {
        return [...state, { id, [fld]: value }];
      } else {
        return [
          ...state.slice(0, i),
          { ...state[i], [fld]: value },
          ...state.slice(i + 1),
        ];
      }
    case PERSONAL_PTAG_ALL:
      return state;
    default:
      return state;
  }
};
