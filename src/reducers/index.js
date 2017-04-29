import { combineReducers } from 'redux';

import { edit }from './edit';
import {sort} from './sort';
import {pbc} from './pbc';
import {hide} from './hide';

export const index = combineReducers({
  edit,
  pbc,
  sort,
  hide,
});

export default index;
