import { combineReducers } from 'redux';
import user from './user_reducer';
import subject from './subject_reducer';
import global from './global_reducers';
import calendar from './calendar_reducers';

const rootReducer = combineReducers({
  user,
  subject,
  global,
  calendar,
});

export default rootReducer;
