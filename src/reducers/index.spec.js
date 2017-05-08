import index from './index';
import { edit } from './edit';
import {
  EDIT_PROMPT,
  EDIT_CLEAR,
  EDIT_ID,
  EDIT_ONLY,
  EDIT_VALUE
} from '../actions/index';

describe('index', () => {
  it('should handle initial state', () => {
    let state = null;
    state = index({}, { type: 'SET_PBC', name: 'pbc' });
    //expect(state).toEqual({"edit": {"field": ""}, "hide": {}, "pbc": "pbc", "sort": "tc"});
  });
});

describe('edit', () => {
  it('should handle initial state null', () => {
    let state = null;
    state = edit(state, { type: 'SET_PBC', name: 'pbc' });
    expect(state).toEqual(state);
  });

  it('should handle initial state null', () => {
    let state = null;
    state = edit(state, { type: EDIT_CLEAR });
    expect(state).toEqual({});
  });

  it('should handle initial state null', () => {
    expect(edit(null, { type: EDIT_CLEAR })).toEqual({});
  });

  it('should handle EDIT_PROMPT', () => {
    let action;
    action = edit(null, {
      type: EDIT_PROMPT,
      id: 'xxx',
      field: 'pbc'
    });
    let state = edit(null, {
      id: 'xxx',
      field: 'pbc'
    });
    expect(edit(null, action)).toEqual(state);
  });

  it('should handle EDIT_VALUE', () => {
    let action;
    action = edit(null, {
      type: EDIT_VALUE,
      id: 'xxx',
      field: 'pbc',
      value: 'Brian'
    });
    let state = edit(null, {
      field: 'pbc',
      value: 'Brian',
      id: 'xxx'
    });
    expect(edit(state, action)).toEqual(state);
  });
});

import { filter } from '../filter';
import Superset from 'superset';

const tagParse = str => {
  if (!str || !/[^\s*$]/.test(str)) {
    return [];
  } else {
    str = str.split(/\s*[, ]\s*/);
    return str.filter(x => x !== '');
  }
};

//permitted tags may include <blank>
const tagFilter = (tcs, permittedTags) => {
  return tcs.filter(tc => {
    const tags = tagParse(tc.tags);
    if (!permittedTags.includes('<blank>') && tags === []) {
      return false;
    }
    return tcs.filter(tc => !permittedTags.includes(tags));
  });
};

describe('tags', () => {
  const tcs1 = [{ tags: 'nrd' }, {}, { tags: 'svc, nrd' }, { tags: 'svc' }];

  const tcs2 = tcs1.map(tc => {
    let tags = tc.tags || [];
    tags = tagParse(tags);
    return { ...tc, tags };
  });

  const tcs = [
    { tags: ['nrd'] },
    {},
    { tags: ['svc', 'nrd'] },
    { tags: ['svc'] }
  ];
  const tcss = tcs.map(tc => {
    return { ...tc, tags: tc.tags || [] };
  });

  it('should properly filter nothing', () => {
    const off = {};
    expect(filter(off, tcs).length).toEqual(4);
  });

  it('should properly filter nothing', () => {
    const off = { tags: [] };
    expect(filter(off, tcs).length).toEqual(4);
  });

  it('should properly filter <blank>', () => {
    const off = { tags: ['<blank>'] };
    expect(filter(off, tcs).length).toEqual(3);
  });

  it('should properly filter all', () => {
    const off = { tags: ['nrd', '<blank>', 'svc'] };
    const allTags = Array.from(
      tcs2.reduce((a, b) => a.union(b['tags'] || []), new Superset())
    );
    const left = tagFilter(tcs1, off.tags)
    expect(left.length).toEqual(4);
    console.log({ allTags, tcs2, left });
  });
  it('should properly filter all', () => {
    const off = { tags: ['nrd', '<blank>', 'svc'] };
    const allTags = Array.from(
      tcs2.reduce((a, b) => a.union(b['tags'] || []), new Superset())
    );
    const left = tagFilter(tcs1, off.tags)
    expect(left.length).toEqual(4);
    console.log({ allTags, tcs2, left });
  });
});
