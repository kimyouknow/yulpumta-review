import { setToday } from '../middleware/compareDate';
import Day from '../models/Day';
import Lapse from '../models/Lapse';
import Subject from '../models/Subject';
// findUser 미들웨어로 token으로 로그인한 유저의 정보를 db에서 찾는 과정을 정리
// findSubject 미들웨어로 user 내에서 요청한 과목이 있는지 체크
// checkSubjectTitle 미들웨어로 user 내에서 과목명이 겹치는 것이 있는지 체크
const s_today = Number(setToday());

export const recordActive = async (req, res) => {
  // console.log(s_today);
  const {
    user,
    subject,
    body: { startTime, endTime, lapse },
  } = req;
  try {
    const today = await Day.findOne({
      subject_id: String(subject._id),
      user_id: String(user._id),
      d_date: s_today,
    });
    if (!today) {
      console.log('오늘날짜 없음');
      const newDay = new Day({
        user_id: user._id,
        subject_id: subject._id,
        d_date: s_today,
        d_total: lapse,
      });
      await newDay.save();
      const newLapse = new Lapse({
        user_id: user._id,
        subject_id: subject._id,
        subject_title: subject.title,
        l_date: newDay._id,
        date: s_today,
        l_start_time: startTime,
        l_end_time: endTime,
        l_lapse: lapse,
      });
      await newLapse.save();
      newDay.lapses.push(newLapse);
      await newDay.save();
      // subject의 dates에도 오늘날짜 추가
      subject.dates.push(newDay);
      await subject.save();
    } else {
      console.log('오늘날짜 있음');
      const newLapse = new Lapse({
        user_id: user._id,
        subject_id: subject._id,
        subject_title: subject.title,
        l_date: today._id,
        date: s_today,
        l_start_time: startTime,
        l_end_time: endTime,
        l_lapse: lapse,
      });
      today.d_total = today.d_total + lapse;
      today.lapses.push(newLapse);
      await today.save();
      await newLapse.save();
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
    if (subject.dates.length === 0) {
      return { _id, title, user_id, color, todayTotalT: 0 };
    } else {
      const last = dates[dates.length - 1];
      const latestDay = last.d_date;
      let todayTotalT = 0;
      if (latestDay === s_today) {
        todayTotalT = last.d_total;
      }
      return { _id, title, user_id, color, todayTotalT };
    }
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
  const newSubject = new Subject({
    user_id: user._id,
    color,
    title,
  });
  await newSubject.save();
  user.subjects.push(newSubject);
  await user.save();
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
    // 1.유저의 subjects에서 해당 과목 지우기
    // 2.subject 지우기
    // 3. day에서 subject의 _id인거 지우기
    // 4. lapse에서 subject의 _id인거 지우기
    await Subject.findByIdAndDelete(_id);
    await user.subjects.splice(user.subjects.indexOf(_id), 1);
    user.save();
    await Day.deleteMany({ subject_id: _id });
    await Lapse.deleteMany({ subject_id: _id });
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
