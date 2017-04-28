export const filter = (off, tcs) => {
  let ans = tcs;
  Object.keys(off).forEach(key => {
    ans = ans.filter(x => {
      if (key === '<blank>') {
        return !(x[key] === undefined || x[key] === '');
      } else {
        return !off[key].includes(x[key]);
      }
    });
  });
  return ans;
};

export const filterx = (off, tcs) => {
  let ans = tcs;
  Object.keys(off).forEach(key => {
    let k = off[key];
    ans = ans.filter(x => {
      let v = x[key];
      if (k === '<blank>') {
        if (v === undefined || v === '') {
          return true;
        } else {
          return false;
        }
      }
      return !off[key].includes(v);
    });
  });
  return ans;
};
