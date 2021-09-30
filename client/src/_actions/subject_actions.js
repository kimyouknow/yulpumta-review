import axios from "axios";
import { ADD_SUBEJCT, DEL_SUBEJCT, EDIT_SUBEJCT, GET_SUBJECT } from "./types";

function r_getSubject(data) {
  return {
    type: GET_SUBJECT,
    payload: data,
  };
}

export function getSubject(dataTosubmit) {
  return (dispatch) => {
    axios.post("api/get-subject", dataTosubmit).then(({ data }) => {
      dispatch(r_getSubject(data));
    });
  };
}

export function addSubject(dataTosubmit) {
  const request = axios
    .post("/api/add-subject", dataTosubmit)
    .then((response) => response.data);
  return {
    type: ADD_SUBEJCT,
    payload: request,
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
