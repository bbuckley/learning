//const isBlank = str => !str || /^\s*$/.test(str);
const isBlank = str => !str || !/[^\s*$]/.test(str);

const tagParse = str => {
  if (!str || !/[^\s*$]/.test(str)) {
    return [];
  } else {
    str = str.split(/\s*[, ]\s*/);
    return str.filter(x => x !== '');
  }
};

import Superset from 'superset';

const tagFilter = (tcs, permittedTags, off) => {
  console.log('in tagFilter', off);
  const s = new Superset(permittedTags);
  const ans = tcs.filter(tc => {
    const tags = tagParse(tc.tags);
    if (tags.length === 0) {
      return true;
    }

    return tags.some(x => permittedTags.includes(x));
  });
  console.log('at bottom of tagFilter', ans.length);
  return ans;
};

export const filter = (off, tcs) => {
  let ans = tcs;
  Object.keys(off).filter(off => off !== 'tags').forEach(key => {
    console.log(key);
    ans = ans.filter(x => {
      const y = x[key];
      const z = off[key];
      if (isBlank(y) && z.includes('<blank>')) return false;
      return !z.includes(y);
    });
  });

  const all = Array.from(
    ans.reduce((a, b) => a.union(tagParse(b.tags)), new Superset())
  );
  const exclude = off.tags || [];
  const include = Array.from(new Superset(all).subtract(new Superset(exclude)));

  ans = tagFilter(ans, include, off);

  if((off.tags || []).includes('<blank>')){
    ans = ans.filter(x => !isBlank(x.tags))
  }

  return ans;
};

// export const filter = (off, tcs) => {
//   let ans = tcs;
//   console.log('here', JSON.stringify(off));
//   Object.keys(off).filter(fld => off[fld].includes('<blank>')).forEach(fld => {
//     ans = ans.filter(x => {
//       return !isBlank(x[fld]);
//     });
//   });
//
//   Object.keys(off).filter(fld => !off[fld].includes('<blank>')).forEach(key => {
//     console.log(key);
//
//     //const allTaga = ans.reduce(a,b,new Super)
//
//     ans = ans.filter(x => {
//       const y = x[key];
//       const z = off[key];
//       const a =  tagParse(y)
//
//
//       return !a.includes(y);
//     });
//   });
//   return x;
// };
