import axios from "axios";
import { catchError } from "./global_actions";
import { ADD_SUBEJCT, DEL_SUBEJCT, EDIT_SUBEJCT, GET_SUBJECT } from "./types";

function r_getSubject(data) {
  return {
    type: GET_SUBJECT,
    payload: data,
  };
}

function r_addSubejct(data) {
  return {
    type: ADD_SUBEJCT,
    payload: data,
  };
}

export function getSubject(dataTosubmit) {
  return (dispatch) => {
    axios
      .post("api/get-subject", dataTosubmit)
      .then(({ data: { success, message, subjects } }) => {
        if (!success) return dispatch(catchError(message));
        return dispatch(r_getSubject({ subjects }));
      });
  };
}

export function addSubject(dataTosubmit) {
  return (dispatch) => {
    axios.post("/api/add-subject", dataTosubmit).then(({ data }) => {
      dispatch(r_addSubejct(data));
    });
  };
}

export function editSubject(dataTosubmit) {
  const request = axios
    .post("/api/edit-subject", dataTosubmit)
    .then((response) => response.data);
  return {
    type: EDIT_SUBEJCT,
    payload: request,
  };
}

export function deleteSubject(dataTosubmit) {
  const request = axios
    .post("/api/del-subject", dataTosubmit)
    .then((response) => response.data);
  return {
    type: DEL_SUBEJCT,
    payload: request,
  };
}
