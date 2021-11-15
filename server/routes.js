//user
const REGISTER = "/register";
const LOGIN = "/login";
const LOGOUT = "/logout";
const WITHDRAWAL = "/withdrawal";

//middleware
const AUTH = "/auth";
const API = "/api";

// subject & lapse
const SUBJECT_GET = "/get-subject";
const SUBJECT_ADD = "/add-subject";
const SUBJECT_DEL = "/del-subject";
const SUBJECT_EDIT = "/edit-subject";
const SUBJECT_RECORD = "/record-subject";

// stat
const STAT_GET = "/get-stat";
const DAILYLAPSE_GET = "/get-dailyLapse";

//planner
const PLAN_GET = "/get-plan";
const PLAN_ADD = "/add-plan";
const PLAN_EDIT = "/edit-plan";
const PLAN_DEL = "/del-plan";
const PLAN_COM = "/com-plan";

const routes = {
  auth: AUTH,
  api: API,
  register: REGISTER,
  login: LOGIN,
  logout: LOGOUT,
  withdrawal: WITHDRAWAL,
  getSubject: SUBJECT_GET,
  addSubject: SUBJECT_ADD,
  delSubject: SUBJECT_DEL,
  editSubject: SUBJECT_EDIT,
  recordSubject: SUBJECT_RECORD,
  getStat: STAT_GET,
  getDailyLapse: DAILYLAPSE_GET,
  getPlan: PLAN_GET,
  addPlan: PLAN_ADD,
  editPlan: PLAN_EDIT,
  delPlan: PLAN_DEL,
  comPlan: PLAN_COM,
};
export default routes;
