import Day from '../models/Day';
import { setToday } from './compareDate';

const s_today = Number(setToday());

export const checkToday = (req, res) => {
  const today = await Day.findOne({
    user_id: String(user._id),
    d_date: s_today,
  });
  if (!today) {
    console.log('오늘날짜 없음');
  } else {
    console.log('오늘날짜 있음');
  }
};
