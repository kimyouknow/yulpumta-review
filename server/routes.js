//user
const REGISTER = "/register";
const LOGIN = "/login";
const LOGOUT = "/logout";
const WITHDRAWAL = "/withdrawal";

//middleware
const AUTH = "/auth";
const API = "/api";

// subject & lapse
const GET_SUBJECT = "/get-subject";
const ADD_SUBJECT = "/add-subject";
const DEL_SUBJECT = "/del-subject";
const EDIT_SUBJECT = "/edit-subject";
const ACTIVE = "/active";

const routes = {
  auth: AUTH,
  api: API,
  register: REGISTER,
  login: LOGIN,
  logout: LOGOUT,
  withdrawal: WITHDRAWAL,
  active: ACTIVE,
  getSubject: GET_SUBJECT,
  addSubject: ADD_SUBJECT,
  delSubject: DEL_SUBJECT,
  editSubject: EDIT_SUBJECT,
};
export default routes;
