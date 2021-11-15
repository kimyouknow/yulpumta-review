import { setToday } from '../middleware/compareDate';
import Day from '../models/Day';
import Plan from '../models/Plan';
const s_today = Number(setToday());

export const getPlan = (req, res) => {
  console.log('getPlan');
  const { user, body } = req;
  console.log(user, body);
};
export const addPlan = (req, res) => {
  console.log('addPlan');
  const { user, body } = req;
};
export const editPlan = (req, res) => {
  console.log('editPlan');
};
export const delPlan = (req, res) => {
  console.log('delPlan');
};
export const comPlan = (req, res) => {
  console.log('comPlan');
};
