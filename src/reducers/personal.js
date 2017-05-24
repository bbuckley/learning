import { PERSONAL_EDIT } from '../actions/index';

export const personal = (state = [], { type, id, fld, value }) => {
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
    default:
      return state;
  }
};
