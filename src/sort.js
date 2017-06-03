import { fields } from './fields';

export const symbol = (current, { fld, order }) =>
  current !== fld ? current : order ? fld + '\u2193' : fld + '\u2191';

// export const sort_date_field = (a, b, x = 'crd', r = false) => {
//   let a1 = a[x];
//   let b1 = b[x];
//
//   let r1 = '1/1/1900';
//   if (r === false) {
//     r1 = '12/31/9999';
//   }
//   if (a1 === undefined || a1 === '') {
//     a1 = r1;
//   }
//   if (b1 === undefined || b1 === '') {
//     b1 = r1;
//   }
//   a1 = new Date(a1);
//   b1 = new Date(b1);
//
//   if (!r) {
//     if (a1 < b1) return -1;
//     if (a1 > b1) return 1;
//     return 0;
//   } else {
//     if (a1 < b1) return 1;
//     if (a1 > b1) return -1;
//     return 0;
//   }
// };

export const sort_text_field = (a, b, x = 'text', r = false) => {
  const z = '';
  if (typeof a[x] === 'undefined') {
    a[x] = z;
  }
  if (typeof b[x] === 'undefined') {
    b[x] = z;
  }
  let a1 = a[x];
  let b1 = b[x];

  if (!r) {
    if (a1 < b1) return -1;
    if (a1 > b1) return 1;
    return sort_text_field(a, b, 'id', !r);
  } else {
    if (a1 < b1) return 1;
    if (a1 > b1) return -1;
    return sort_text_field(a, b, 'id', r);
  }
};

export const sorter = (tcs, { fld, order }) => {
  let sort;
  switch (fields[fld].sort_type) {
    case 'text':
      sort = (a, b) => {
        const z = '';
        if (typeof a[fld] === 'undefined') {
          a[fld] = z;
        }
        if (typeof b[fld] === 'undefined') {
          b[fld] = z;
        }
        let a1 = a[fld];
        let b1 = b[fld];
        if (order) {
          if (a1 < b1) return -1;
          if (a1 > b1) return 1;
          return sort_text_field(a, b, 'id', order);
        } else {
          if (a1 < b1) return 1;
          if (a1 > b1) return -1;
          return sort_text_field(a, b, 'id', order);
        }
      };
      break;
    case 'date':
      sort = (a, b) => {
        let a1 = a[fld];
        let b1 = b[fld];
        let r1 = order ? '12/31/9999' : '12/31/9999'

        if (a1 === undefined || a1 === '') {
          a1 = r1;
        }
        if (b1 === undefined || b1 === '') {
          b1 = r1;
        }
        a1 = new Date(a1);
        b1 = new Date(b1);
        if (order) {
          if (a1 < b1) return -1;
          if (a1 > b1) return 1;
          return sort_text_field(a, b, 'id', order);
        } else {
          if (a1 < b1) return 1;
          if (a1 > b1) return -1;
          return sort_text_field(a, b, 'id', !order);
        }
      };
      break;
    case 'number':
      sort = (a, b) => {
        const z = '';
        if (typeof a[fld] === 'undefined') {
          a[fld] = z;
        }
        if (typeof b[fld] === 'undefined') {
          b[fld] = z;
        }
        let a1 = a[fld];
        let b1 = b[fld];
        if (order) {
          if (Number(a1) < Number(b1)) return -1;
          if (Number(a1) > Number(b1)) return 1;
          return sort_text_field(a, b, 'id', order);
        } else {
          if (Number(a1) < Number(b1)) return 1;
          if (Number(a1) > Number(b1)) return -1;
          return sort_text_field(a, b, 'id', !order);
        }
      };
      break;
    default:
  }

  return tcs.sort(sort);
};
