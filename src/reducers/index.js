import { combineReducers } from 'redux';

import edit from './edit';
import sort from './sort';
import pbc from './pbc';

const index = combineReducers({
  edit,
  pbc,
  sort,
});

export default index;
