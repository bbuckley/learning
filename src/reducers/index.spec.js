import index  from './index';

describe('index', () => {
  it('should handle initial state', () => {
    let state = null;
    state = index({}, { type: 'SET_PBC', name: 'pbc' });
    expect(state).toEqual({"edit": {"field": ""}, "hide": {}, "pbc": "pbc", "sort": "tc"});
  });
});
