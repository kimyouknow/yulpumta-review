import { AUTH_USER, LOGIN_USER, REGISTER_USER } from "_actions/types";

const getCookieValue = (name) =>
  document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || "";

const initState = {
  name: "",
  token: getCookieValue("user_auth"),
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, name: action.payload.name };
    case REGISTER_USER:
      return { ...state };
    case AUTH_USER:
      const {
        payload: { name, token },
      } = action;
      return {
        ...state,
        name,
        token,
      };
    default:
      return state;
  }
};

export default userReducer;
