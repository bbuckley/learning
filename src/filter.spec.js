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
  const off = { pbc: [BL,'David'] };
  const tcs = [{ pbc: '' }, {}, { pbc: ' ' }, { pbc: 'David' },{ pbc: 'Brian' }];
  expect(filter(off, tcs)).toEqual([{ pbc: 'Brian' }]);
});

it('filter with blank works on one', () => {
  // const tcs = [
  //   { id: 1, pbc: 'Brian' },
  //   { id: 2, pbc: 'Karl' },
  //   { id: 3, pbc: '' }
  // ];
  // const expected_filtered_tcs = [{ pbc: 'Karl' }];
  // const actual_filtered_tcs = filter(off, tcs);
  // expect(actual_filtered_tcs).toEqual(off, expected_filtered_tcs);
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
