import Day from "../models/Day";
import Lapse from "../models/Lapse";
import Subject from "../models/Subject";
// findUser 미들웨어로 token으로 로그인한 유저의 정보를 db에서 찾는 과정을 정리
// findSubject 미들웨어로 user 내에서 요청한 과목이 있는지 체크
// checkSubjectTitle 미들웨어로 user 내에서 과목명이 겹치는 것이 있는지 체크

export const recordActive = async (req, res) => {
  const {
    user,
    subject,
    body: { startTime, endTime, lapse },
  } = req;
  const s_today = String(new Date()).substring(0, 15);
  try {
    // 이미 lpase가 기록된 날짜가 있는지 확인
    const today = await Day.findOne({
      user_id: user._id,
      subject_id: subject._id,
      d_date: s_today,
    });
    if (!today) {
      console.log("오늘날짜 없음");
      const newDay = new Day({
        user_id: user._id,
        subect_id: subject._id,
        d_date: s_today,
      });
      const newLapse = new Lapse({
        user_id: user._id,
        subject_id: subject._id,
        l_date: newDate._id,
        l_start_time: startTime,
        l_end_time: endTime,
        l_lapse: lapse,
      });
      newDay.lapses.push(newLapse);
      await newLapse.save();
      await newDay.save();
      subject.dates.push(newDay);
      await subject.save();
    }
    console.log("오늘날짜 있음");
    const newLapse = new Lapse({
      user_id: user._id,
      subject_id: subject._id,
      l_date: today._id,
      l_start_time: startTime,
      l_end_time: endTime,
      l_lapse: lapse,
    });
    today.lapses.push(newLapse);
    await newLapse.save();
    await today.save();
    subject.dates.push(today);
    await subject.save();
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
  const subjects = await Subject.find({ user_id: user._id });
  // subejct 각각의 요소들에 대해서
  console.log(subjects);
  return res.json({
    success: true,
    message: "",
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
  const newSubject = await Subject.create({
    user_id: user._id,
    color,
    title,
  });
  user.subjects.push(newSubject);
  user.save();
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
    subject: { user_id, _id },
  } = req;
  if (String(user_id) !== String(user._id))
    return res.json({
      success: false,
      message: "유저 ID가 일치하지 않습니다.",
    });
  try {
    await Subject.findByIdAndDelete(_id);
    await user.subjects.splice(user.subjects.indexOf(_id), 1);
    user.save();
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      message: err.message,
    });
  } finally {
    return res.json({
      success: true,
      message: "",
    });
  }
};
