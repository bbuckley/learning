export const hide = (state = {}, { type, id, field, values, value }) => {
  switch (type) {
    case 'HIDE_CLEAR': //shows all
      if (field === undefined) {
        return {};
      } else {
        return { ...state, [field]: [] };
      }

    case 'HIDE_ALL':
      console.log({ values });
      return { ...state, [field]: values };
    case 'HIDE_FLIP':
      const a = state[field] || [];
      const i = a.findIndex(v => v === value);
    //`s`  console.log({ field, value, a, i });
      if (a.findIndex(v => v === value) !== -1) {
        return { ...state, [field]: [...a.slice(0, i), ...a.slice(i + 1)] };
      } else {
        return { ...state, [field]: [...a, value] };
      }
    default:
      return state;
  }
};
