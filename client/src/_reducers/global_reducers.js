import { CATCH_ERR, CLOSE_MODAL, OPEN_MODAL, RESET_ERR } from "_actions/types";

const initState = {
  isOpen: false,
  errMsg: "",
};

const globalReducer = (state = initState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return { isOpen: true };
    case CLOSE_MODAL:
      return { isOpen: false, errMsg: "" };
    case CATCH_ERR:
      return { isOpen: true, errMsg: action.payload };
    case RESET_ERR:
      return { isOpen: false, errMsg: "" };
    default:
      return state;
  }
};

export default globalReducer;
