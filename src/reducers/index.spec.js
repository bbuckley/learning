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
