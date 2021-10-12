import axios from "axios";
import { catchError } from "./global_actions";
import {
  RECORD_SUBJECT,
  ADD_SUBEJCT,
  DEL_SUBEJCT,
  EDIT_SUBEJCT,
  GET_SUBJECT,
  ACTIVE_SUBJECT,
} from "./types";

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

function r_editSubejct(data) {
  return {
    type: EDIT_SUBEJCT,
    payload: data,
  };
}

function r_deleteSubejct(data) {
  return {
    type: DEL_SUBEJCT,
    payload: data,
  };
}

export async function recordSubejct(dataTosubmit) {
  const request = await axios.post("/api/record-subject", dataTosubmit);
  return {
    type: RECORD_SUBJECT,
    payload: request,
  };
}

export function activeSubject(subejct) {
  return {
    type: ACTIVE_SUBJECT,
    payload: subejct,
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
    axios
      .post("/api/add-subject", dataTosubmit)
      .then(({ data: { success, message, newSubject } }) => {
        if (!success) return dispatch(catchError(message));
        return dispatch(r_addSubejct(newSubject));
      });
  };
}

export function editSubject(dataTosubmit) {
  return (dispatch) => {
    axios
      .post("/api/edit-subject", dataTosubmit)
      .then(({ data: { success, message, subject } }) => {
        if (!success) return dispatch(catchError(message));
        return dispatch(r_editSubejct(subject));
      });
  };
}

export function deleteSubject(dataTosubmit) {
  return (dispatch) => {
    axios
      .post("/api/del-subject", dataTosubmit)
      .then(({ data: { success, message } }) => {
        if (!success) return dispatch(catchError(message));
        return dispatch(r_deleteSubejct(dataTosubmit));
      });
  };
}
