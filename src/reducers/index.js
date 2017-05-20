import { combineReducers } from 'redux';

import { edit }from './edit';
import {sort} from './sort';
import {pbc} from './pbc';
import {hide} from './hide';
import {view} from './view';
import {favorites} from './favorites';

const index = combineReducers({
  edit,
  pbc,
  sort,
  hide,
  view,
  favorites,
});

export default index;
