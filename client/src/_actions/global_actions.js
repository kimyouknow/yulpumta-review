import { CATCH_ERR, CLOSE_MODAL, OPEN_MODAL, RESET_ERR } from "./types";

export const openModal = () => {
  return {
    type: OPEN_MODAL,
  };
};

export const closeModal = () => {
  return {
    type: CLOSE_MODAL,
  };
};

export const catchError = (msg) => {
  return {
    type: CATCH_ERR,
    payload: msg,
  };
};

export const resetError = () => {
  return {
    type: RESET_ERR,
  };
};
