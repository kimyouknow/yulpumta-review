import CalendarDate from '../models/CalendarDate';

export const getMonthData = async (user, year, month, isPlanData) => {
  const Y = String(year);
  const M = String(month < 10 ? '0' + month : month);
  let rawMonthData;
  if (isPlanData) {
    rawMonthData = await CalendarDate.find({
      user_id: user._id,
      d_date: { $gt: Number(Y + M + '00'), $lt: Number(Y + M + '40') },
    }).populate('plans');
  } else {
    rawMonthData = await CalendarDate.find({
      user_id: user._id,
      d_date: { $gt: Number(Y + M + '00'), $lt: Number(Y + M + '40') },
    });
  }
  return { rawMonthData, Y, M };
};
