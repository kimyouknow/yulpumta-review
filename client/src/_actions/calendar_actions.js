import axios from "axios";
import { catchError } from "./global_actions";
import { GET_TOTAL_TIME } from "./types";

function r_getTimeInfo(data) {
  return {
    type: GET_TOTAL_TIME,
    payload: data,
  };
}

export function getTimeInfo(dataTosubmit) {
  return (dispatch) => {
    axios
      .post("api/get-stat", dataTosubmit)
      .then(({ data: { success, message, data } }) => {
        if (!success) return dispatch(catchError(message));
        return dispatch(r_getTimeInfo(data));
      });
  };
}
