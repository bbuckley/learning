

import { SET_PBC } from '../action/index'

export const pbc = (state = '', action) => {
  switch (action.type) {
    case SET_PBC:
      return action.name
    default:
      return state;
  }
};
