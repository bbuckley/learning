import { VIEW_SET} from '../actions/index'

export const view = (state = '', { type, value }) => {
  switch (type) {
    case VIEW_SET:
      return value;
    default:
      return state;
  }
};
