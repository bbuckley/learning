import Superset from 'superset';
import {
  HIDE_FLIP_ALL,
  HIDE_FLIP,
  HIDE_CLEAR,
  HIDE_ALL,
  HIDE_ONLY,
  HIDE_OTHER_FIELDS_CLEAR,
  HIDE_TOGGLE,
  HIDE_VALUE,
  HIDE_REMOVE_FILTER,
} from '../actions/index';

export const hide = (state = {}, { type, id, field, values, value }) => {
  switch (type) {
    case HIDE_REMOVE_FILTER:
      return { ...state, [field]: [] };
    case HIDE_VALUE:
      return { ...state, [field]: [value, ...(state[field] || [])] };
    case HIDE_TOGGLE:
      return (state[field] || []).length === values.length
        ? { ...state, [field]: [] }
        : { ...state, [field]: values };
    case HIDE_CLEAR:
      return {}; //shows all
    case HIDE_ALL:
      return { ...state, [field]: values };
    case HIDE_FLIP:
      const a = state[field] || [];
      const i = a.findIndex(v => v === value);
      if (a.findIndex(v => v === value) !== -1) {
        return { ...state, [field]: [...a.slice(0, i), ...a.slice(i + 1)] };
      } else {
        return { ...state, [field]: [...a, value] };
      }
    case HIDE_FLIP_ALL:
      return {
        ...state,
        [field]: Array.from(
          new Superset(values).subtract(new Superset(state[field] || [])),
        ),
      };
    case HIDE_ONLY:
      return { [field]: values.filter(x => x !== value) };
    //return { ...state, [field]: values.filter(x => x !== value) };
    //return { [field]: value };
    case HIDE_OTHER_FIELDS_CLEAR:
      return { [field]: state[field] };

    default:
      return state;
  }
};
