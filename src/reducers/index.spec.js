import { index }  from './index';

describe('index', () => {
  it('should handle initial state', () => {
    let state = null;
    state = index(null, { type: SET_PBC, name: 'pbc' });
    expect(state).toEqual('pbc'); //cool
  });
});
