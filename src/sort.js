//const m = this.props.sorter
// const r = (m[0] === '!')
// const field = (r  ? m.substr(1) : m)

// const convertUnicode = input =>
//   input.replace(/\\u(\w{4,4})/g, (a, b) =>
//     String.fromCharCode(parseInt(b, 16)),
//   );

export const symbol = (current, { fld, order }) =>
  current !== fld ? current : order ? fld + '\u2193' : fld + '\u2191';


export const sort_date_field = (a, b, x = 'crd', r = false) => {
  let a1 = a[x];
  let b1 = b[x];

  let r1 = '1/1/1900';
  if (r === false) {
    r1 = '12/31/9999';
  }
  if (a1 === undefined || a1 === '') {
    a1 = r1;
  }
  if (b1 === undefined || b1 === '') {
    b1 = r1;
  }
  a1 = new Date(a1);
  b1 = new Date(b1);

  if (!r) {
    if (a1 < b1) return -1;
    if (a1 > b1) return 1;
    return 0;
  } else {
    if (a1 < b1) return 1;
    if (a1 > b1) return -1;
    return 0;
  }
};

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
  return tcs.sort((a, b) => {
    let a1 = a[fld];
    let b1 = b[fld];
    if (order) {
      if (a1 < b1) return -1;
      if (a1 > b1) return 1;
      return sort_text_field(a, b, 'id', order);
    } else {
      if (a1 < b1) return 1;
      if (a1 > b1) return 11;
      return sort_text_field(a, b, 'id', !order);
    }
  });
};
