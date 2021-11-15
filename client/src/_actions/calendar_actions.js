import axios from "axios";
import { catchError } from "./global_actions";
import {
  GET_TOTAL_TIME,
  PLAN_ADD,
  PLAN_CHECK,
  PLAN_GET,
  PLAN_SELECT_DAY,
  STAT_SELECT_DAY,
} from "./types";

function r_getTimeInfo(data) {
  return {
    type: GET_TOTAL_TIME,
    payload: data,
  };
}

function r_selectDay(data) {
  return {
    type: STAT_SELECT_DAY,
    payload: data,
  };
}

function r_addPlan(data) {
  return {
    type: PLAN_ADD,
    payload: data,
  };
}

function r_getPlans(data) {
  return {
    type: PLAN_GET,
    payload: data,
  };
}

export function planSelectDay(dataTosubmit) {
  return {
    type: PLAN_SELECT_DAY,
    payload: dataTosubmit,
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
export function statSelectDay(dataTosubmit) {
  return (dispatch) => {
    axios
      .post("/api/get-dailyLapse", dataTosubmit)
      .then(({ data: { success, message, dailyLapses } }) => {
        if (!success) return dispatch(catchError(message));
        return dispatch(r_selectDay({ ...dataTosubmit, dailyLapses }));
      });
  };
}

export function getPlans(dataTosubmit) {
  return (dispatch) => {
    axios.post("/api/get-plan", dataTosubmit).then((response) => {
      console.log(response);
      return dispatch(r_addPlan(dataTosubmit));
    });
  };
}

export function addPlan(dataTosubmit) {
  return (dispatch) => {
    axios.post("/api/add-plan", dataTosubmit).then((response) => {
      console.log(response);
      return dispatch(r_getPlans(dataTosubmit));
    });
  };
}

// const PLAN_GET = "/get-plan";
// const PLAN_ADD = "/add-plan";
// const PLAN_EDIT = "/edit-plan";
// const PLAN_DEL = "/del-plan";
// const PLAN_COM = "/com-plan";
