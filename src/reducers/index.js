import { combineReducers } from 'redux';

import { getScore, postScore } from './Score';

export default combineReducers({
  getScore,
  postScore,
});
