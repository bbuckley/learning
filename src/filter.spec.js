import { filter } from './filter';

const BL = '<blank>';

const off = {
  pbc: ['David', 'Brian', BL],
  completed: ['true', 'false', BL]
};

it('filter works', () => {
  const filtered = filter({ pbc: ['David', 'Brian'] }, []);
  expect(filtered).toEqual([]);
});

it('filter a blank ', () => {
  const off = { pbc: [BL, 'David'] };
  const tcs = [
    { pbc: '' },
    {},
    { pbc: ' ' },
    { pbc: 'David' },
    { pbc: 'Brian' }
  ];
  expect(filter(off, tcs)).toEqual([{ pbc: 'Brian' }]);
});

const isBlank = str => !str || !/[^\s*$]/.test(str);

export const tagParse = str => {
  if (isBlank(str)) {
    return [];
  } else {
    str = str.split(/\s*[, ]\s*/);
    return str.filter(x => x !== '')
  }
};

describe('tags', () => {
  it('parse things correctly', () => {
    let x = 'x, 444, 445';
    x = tagParse(x);
    expect(x).toEqual(['x', '444', '445']);
    x = '   ';
    x = tagParse(x);
    expect(x).toEqual([]);
    x = ' 444,77  ';
    x = tagParse(x);
    expect(x).toEqual(['444', '77']);
    x = ' 444,,77  ';
    x = tagParse(x);
    expect(x).toEqual(['444', '77']);
    x = ' 444,,77  ,';
    x = tagParse(x);
    expect(x).toEqual(['444', '77']);
    x = 'nrd foo,  ';
    x = tagParse(x);
    expect(x).toEqual(['nrd', 'foo']);
  });
});

// const doDel = (obj, prop) => {
//   let {[prop]: omit, ...res} = obj
//   return res
// }
// console.log(off);
// console.log({...off, foo: []});
// console.log(doDel(off,'completed'));
// const { a, ...r } = { a: 1, b: 2, c: 3 };
// console.log({a,r});
