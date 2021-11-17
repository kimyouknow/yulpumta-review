import { setDateFormat } from '../middleware/compareDate';
import { getMonthData } from '../middleware/getMonthData';
import CalendarDate from '../models/CalendarDate';
import Plan from '../models/Plan';

export const getPlan = async (req, res) => {
  console.log('getPlan');
  const {
    user,
    body: { year, month },
  } = req;
  const { rawMonthData, Y, M } = await getMonthData(user, year, month, true);
  if (rawMonthData.length === 0)
    return res.json({
      success: true,
      message: '',
      monthPlans: [],
    });
  const monthPlans = Array(31).fill([]);
  try {
    rawMonthData.map((element) => {
      const { d_date, plans } = element;
      const idxDate = d_date - Number(Y + M + '00') - 1;
      monthPlans[idxDate] = [...plans];
    });
  } catch (err) {
    return res.json({
      success: false,
      message: err.message,
      monthPlans: [],
    });
  } finally {
    return res.json({
      success: true,
      message: '',
      monthPlans,
    });
  }
};

const createNewPlan = async (user, title, desc, dateId, dateInfo) => {
  const newPlan = new Plan({
    user_id: user._id,
    p_date: dateId,
    date: dateInfo,
    p_isDone: false,
    p_title: title,
    p_desc: desc,
  });
  await newPlan.save();
  return newPlan;
};

export const addPlan = async (req, res) => {
  console.log('addPlan');
  const { user, body } = req;
  const { title, desc, date } = body;
  const { Y, M, D } = date;
  const targetDate = setDateFormat(Y, M, D);
  let newPlan;
  try {
    const today_calendar = await CalendarDate.findOne({
      user_id: String(user._id),
      d_date: targetDate,
    });
    if (!today_calendar) {
      console.log('오늘 날짜 없음');
      const newDay = new CalendarDate({
        user_id: user._id,
        d_date: targetDate,
        d_total: 0,
      });
      newPlan = await createNewPlan(user, title, desc, newDay._id, targetDate);
      newDay.plans.push(newPlan);
      await newDay.save();
    } else {
      console.log('오늘 날짜 있음');
      newPlan = await createNewPlan(user, title, desc, today_calendar._id, targetDate);
      today_calendar.plans.push(newPlan);
      await today_calendar.save();
    }
  } catch (err) {
    return res.json({
      success: false,
      message: err.message,
    });
  }
  return res.json({
    success: true,
    newPlan,
  });
};

export const editPlan = async (req, res) => {
  console.log('editPlan');
  const {
    body: { desc, title },
    plan,
  } = req;
  try {
    plan.p_title = title;
    plan.p_desc = desc;
    await plan.save();
  } catch (err) {
    return res.json({
      success: false,
      message: err.message,
    });
  }
  return res.json({
    success: true,
  });
};

export const delPlan = async (req, res) => {
  console.log('delPlan');
  const {
    body: { plan_id },
    plan,
  } = req;
  const calendarDate = await CalendarDate.findOne({ d_date: plan.date });
  if (!calendarDate) {
    return res.json({
      success: false,
      message: '해당 날짜를 찾지 못했습니다.',
    });
  }
  try {
    await Plan.findByIdAndDelete(plan_id);
    await calendarDate.plans.splice(calendarDate.plans.indexOf(plan_id), 1);
    await calendarDate.save();
  } catch (err) {
    return res.json({
      success: false,
      message: err.message,
    });
  }
  return res.json({
    success: true,
  });
};
export const comPlan = async (req, res) => {
  console.log('comPlan');
  const {
    plan,
    body: { isDone },
  } = req;
  try {
    plan.p_isDone = !isDone;
    await plan.save();
  } catch (err) {
    return res.json({
      success: false,
      message: err.message,
    });
  }
  return res.json({
    success: true,
  });
};
