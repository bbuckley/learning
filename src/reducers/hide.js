import Superset from 'superset';
import { HIDE_FLIP_ALL, HIDE_FLIP, HIDE_CLEAR, HIDE_ALL } from '../actions/index'

export const hide = (state = {}, { type, id, field, values, value }) => {
  switch (type) {
    case HIDE_CLEAR: //shows all
      return { ...state, [field]: [] };
    case HIDE_ALL:
      console.log({values});
      return { ...state, [field]: values };
    case HIDE_FLIP:
      const a = state[field] || [];
      const i = a.findIndex(v => v === value);
      //console.log({ field, value, a, i });
      if (a.findIndex(v => v === value) !== -1) {
        return { ...state, [field]: [...a.slice(0, i), ...a.slice(i + 1)] };
      } else {
        return { ...state, [field]: [...a, value] };
      }
    case HIDE_FLIP_ALL:
      //console.log('HIDE_FLIP_ALL', values);
      return {
        ...state,
        [field]: Array.from(
          new Superset(values).subtract(new Superset(state[field] || []))
        )
      };
    default:
      return state;
  }
};
