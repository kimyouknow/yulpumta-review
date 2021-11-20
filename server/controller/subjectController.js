import { setToday } from '../middleware/compareDate';
import CalendarDate from '../models/CalendarDate';
import SubjectDate from '../models/SubjectDate';
import Lapse from '../models/Lapse';
import Subject from '../models/Subject';
// findUser 미들웨어로 token으로 로그인한 유저의 정보를 db에서 찾는 과정을 정리
// findSubject 미들웨어로 user 내에서 요청한 과목이 있는지 체크
// checkSubjectTitle 미들웨어로 user 내에서 과목명이 겹치는 것이 있는지 체크
const s_today = Number(setToday());

const createNewLapse = async (user, subject, body, dateInfo) => {
  const { startTime, endTime, lapse } = body;
  const newLapse = new Lapse({
    user_id: user._id,
    subject_id: subject._id,
    subject_title: subject.title,
    l_date: dateInfo._id,
    date: s_today,
    l_start_time: startTime,
    l_end_time: endTime,
    l_lapse: lapse,
  });
  await newLapse.save();
  return newLapse;
};

export const recordActive = async (req, res) => {
  // console.log(s_today);
  const { user, subject, body } = req;
  const { lapse } = body;
  console.log(s_today);
  try {
    // CalendarDate에 새로운 lapse추가
    const today_calendar = await CalendarDate.findOne({
      user_id: String(user._id),
      d_date: s_today,
    });
    if (!today_calendar) {
      console.log('오늘 calendar date 날짜 없음');
      const newDay = new CalendarDate({
        user_id: user._id,
        d_date: s_today,
        d_total: lapse,
      });
      const newLapse = await createNewLapse(user, subject, body, newDay);
      newDay.lapses.push(newLapse);
      await newDay.save();
    } else {
      console.log('오늘 calendar date 날짜 있음');
      const newLapse = await createNewLapse(user, subject, body, today_calendar);
      today_calendar.d_total = today_calendar.d_total + lapse;
      today_calendar.lapses.push(newLapse);
      await today_calendar.save();
    }
    // SubjectDate 새로운 lapse추가
    const today_subject = await SubjectDate.findOne({
      user_id: String(user._id),
      subject_id: String(subject._id),
      d_date: s_today,
    });
    if (!today_subject) {
      console.log('오늘 subject date 날짜 없음');
      const newSubjectDate = new SubjectDate({
        user_id: String(user._id),
        subject_id: String(subject._id),
        d_date: s_today,
        subject_title: subject.title,
        s_total: lapse,
      });
      console.log(newSubjectDate);
      await newSubjectDate.save();
    } else {
      console.log('오늘 subject date 날짜 있음');
      today_subject.s_total = today_subject.s_total + lapse;
      await today_subject.save();
    }
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

export const getSubject = async (req, res) => {
  // findUser
  const { user } = req;
  const data = await Subject.find({ user_id: user._id }).populate('dates');
  // 과목이 하나도 없으면 빈 배열 반환
  if (data.length === 0)
    return res.json({
      success: true,
      message: '',
      subjects: [],
    });
  // 과목 배열을 돌면서 dates가 있으면(기록이 한 번이라도 없으면 todayTotalT = 0)
  // 기록이 있지만 오늘날짜가 없어도 todayTotalT = 0
  // 오늘날짜가 있으면 해당 날짜의 d_total 반환
  const subjects = data.map((subject) => {
    const { _id, title, user_id, color, dates } = subject;
    const today = dates.find((date) => date.s_date === s_today);
    if (!today) return { _id, title, user_id, color, todayTotalT: 0 };
    return { _id, title, user_id, color, todayTotalT: today.s_total };
  });
  return res.json({
    success: true,
    message: '',
    subjects,
  });
};

export const addSubject = async (req, res) => {
  // findUser
  // checkSubjectTitle
  const {
    body: { title, color },
    user,
  } = req;
  let newSubject;
  try {
    newSubject = new Subject({
      user_id: user._id,
      color,
      title,
    });
    const newSubjectDate = new SubjectDate({
      user_id: user._id,
      subject_id: newSubject._id,
      subject_title: title,
      s_date: s_today,
      s_total: 0,
    });
    await newSubjectDate.save();
    newSubject.dates.push(newSubjectDate);
    await newSubject.save();
    user.subjects.push(newSubject);
    await user.save();
  } catch (err) {
    return res.json({
      success: false,
      message: err.message,
    });
  }
  return res.json({
    success: true,
    newSubject,
  });
};

export const editSubject = async (req, res) => {
  // findUser
  // findSubject
  // checkSubjectTitle
  const {
    body: { title, color },
    subject,
  } = req;
  try {
    subject.title = title;
    subject.color = color;
    subject.save();
    return res.json({
      success: true,
      subject,
    });
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      message: err.message,
    });
  }
};
export const delSubject = async (req, res) => {
  // findUser
  // findSubject
  // checkSubjectTitle
  const {
    user,
    subject: { user_id, _id, dates },
  } = req;
  if (String(user_id) !== String(user._id))
    return res.json({
      success: false,
      message: '유저 ID가 일치하지 않습니다.',
    });
  try {
    await Subject.findByIdAndDelete(_id);
    await user.subjects.splice(user.subjects.indexOf(_id), 1);
    user.save();
    // 과목은 지우지만 기록은 남겨야 하니까 lapse랑 calendarDate는 유지
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      message: err.message,
    });
  } finally {
    return res.json({
      success: true,
      message: '',
    });
  }
};
