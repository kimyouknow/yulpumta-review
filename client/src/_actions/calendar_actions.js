import axios from "axios";
import { catchError } from "./global_actions";
import { GET_TOTAL_TIME, SELECT_DAY } from "./types";

function r_getTimeInfo(data) {
  return {
    type: GET_TOTAL_TIME,
    payload: data,
  };
}

function r_selectDay(data) {
  return {
    type: SELECT_DAY,
    payload: data,
  };
}

export function getTimeInfo(dataTosubmit) {
  return (dispatch) => {
    axios
      .post("/api/get-stat", dataTosubmit)
      .then(({ data: { success, message, dailyTotalTimes } }) => {
        if (!success) return dispatch(catchError(message));
        return dispatch(r_getTimeInfo(dailyTotalTimes));
      });
  };
}
export function selectDay(dataTosubmit) {
  return (dispatch) => {
    axios
      .post("/api/get-dailyLapse", dataTosubmit)
      .then(({ data: { success, message, dailyLapses } }) => {
        if (!success) return dispatch(catchError(message));
        return dispatch(r_selectDay({ ...dataTosubmit, dailyLapses }));
      });
  };
}
