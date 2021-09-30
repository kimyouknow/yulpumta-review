import { combineReducers } from "redux";
import user from "./user_reducer";
import subject from "./subject_reducer";

const rootReducer = combineReducers({
  user,
  subject,
});

export default rootReducer;
