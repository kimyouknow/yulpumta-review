//user
const REGISTER = "/register";
const LOGIN = "/login";
const LOGOUT = "/logout";
const WITHDRAWAL = "/withdrawal";

//middleware
const AUTH = "/auth";
const API = "/api";

const routes = {
  auth: AUTH,
  api: API,
  register: REGISTER,
  login: LOGIN,
  logout: LOGOUT,
  withdrawal: WITHDRAWAL,
};
export default routes;
