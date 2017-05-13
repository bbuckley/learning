import { VIEW_SET} from '../actions/index'

export const view = (state = '', { type, value }) => {
  console.log('in view');
  switch (type) {
    case VIEW_SET:
      return value;
    default:
      return state;
  }
};
