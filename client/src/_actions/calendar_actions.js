import axios from 'axios';
import { catchError } from './global_actions';
import {
  GET_TOTAL_TIME,
  PLAN_ADD,
  PLAN_CHECK,
  PLAN_DELETE,
  PLAN_EDIT,
  PLAN_GET,
  PLAN_SELECT_DAY,
  STAT_SELECT_DAY,
} from './types';

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

function r_getPlans(data) {
  return {
    type: PLAN_GET,
    payload: data,
  };
}

function r_addPlan(data) {
  return {
    type: PLAN_ADD,
    payload: data,
  };
}

function r_editPlan(data) {
  return {
    type: PLAN_EDIT,
    payload: data,
  };
}

function r_delPlan(data) {
  return {
    type: PLAN_DELETE,
    payload: data,
  };
}

function r_checkPlan(data) {
  return {
    type: PLAN_CHECK,
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
      .post('/api/get-stat', dataTosubmit)
      .then(({ data: { success, message, dailyTotalTimes } }) => {
        if (!success) return dispatch(catchError(message));
        return dispatch(r_getTimeInfo(dailyTotalTimes));
      });
  };
}
export function statSelectDay(dataTosubmit) {
  return (dispatch) => {
    axios
      .post('/api/get-dailyLapse', dataTosubmit)
      .then(({ data: { success, message, dailyLapses } }) => {
        if (!success) return dispatch(catchError(message));
        return dispatch(r_selectDay({ ...dataTosubmit, dailyLapses }));
      });
  };
}

export function getPlans(dataTosubmit) {
  return (dispatch) => {
    axios
      .post('/api/get-plan', dataTosubmit)
      .then(({ data: { success, message, monthPlans } }) => {
        if (!success) return dispatch(catchError(message));
        return dispatch(r_getPlans(monthPlans));
      });
  };
}

export function addPlan(dataTosubmit) {
  return (dispatch) => {
    axios
      .post('/api/add-plan', dataTosubmit)
      .then(({ data: { success, message, newPlan } }) => {
        if (!success) return dispatch(catchError(message));
        return dispatch(r_addPlan({ addedDate: dataTosubmit.date.D, newPlan }));
      });
  };
}

export function editPlan(dataTosubmit) {
  return (dispatch) => {
    axios.post('/api/edit-plan', dataTosubmit).then(({ data: { success, message } }) => {
      if (!success) return dispatch(catchError(message));
      return dispatch(r_editPlan(dataTosubmit));
    });
  };
}

export function checkPlan(dataTosubmit) {
  return (dispatch) => {
    axios.post('/api/com-plan', dataTosubmit).then(({ data: { success, message } }) => {
      if (!success) return dispatch(catchError(message));
      return dispatch(r_checkPlan(dataTosubmit));
    });
  };
}

export function delPlan(dataTosubmit) {
  return (dispatch) => {
    axios.post('/api/del-plan', dataTosubmit).then(({ data: { success, message } }) => {
      if (!success) return dispatch(catchError(message));
      return dispatch(r_delPlan(dataTosubmit));
    });
  };
}
