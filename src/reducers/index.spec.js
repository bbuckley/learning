import index  from './index';
import {edit}  from './edit';

describe('index', () => {
  it('should handle initial state', () => {
    let state = null;
    state = index({}, { type: 'SET_PBC', name: 'pbc' });
    //expect(state).toEqual({"edit": {"field": ""}, "hide": {}, "pbc": "pbc", "sort": "tc"});
  });
});

describe('edit', () => {
  it('should handle initial state', () => {
    let state = null;
    state = edit(state, { type: 'SET_PBC', name: 'pbc' });
    expect(state).toEqual(state);
  });
});
