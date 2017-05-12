import { combineReducers } from 'redux';

import { edit }from './edit';
import {sort} from './sort';
import {pbc} from './pbc';
import {hide} from './hide';
import {view} from './view';

const index = combineReducers({
  edit,
  pbc,
  sort,
  hide,
  view,
});

export default index;
