

//const isBlank = str => !str || /^\s*$/.test(str);
const isBlank = str => !str || !/[^\s*$]/.test(str);

export const filter = (off, tcs) => {
  let ans = tcs;
  Object.keys(off).forEach(key => {
    ans = ans.filter(x => {
      const y = x[key];
      const z = off[key];
      if (isBlank(y) && z.includes('<blank>')) return false;
      return !z.includes(y);
    });
  });
  return ans;
};
