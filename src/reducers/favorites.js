import { FAVORITES_ID_TOGGLE } from '../actions/index';

export const favorites = (state = [], { type, id }) => {
  switch (type) {
    case FAVORITES_ID_TOGGLE:
      return state.includes(id) ? state.filter(x => x !== id) : [...state, id];

    default:
      return state;
  }
};
