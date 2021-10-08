import Lapse from "../models/Lapse";
import Subject from "../models/Subject";
// findUser 미들웨어로 token으로 로그인한 유저의 정보를 db에서 찾는 과정을 정리
// findSubject 미들웨어로 user 내에서 요청한 과목이 있는지 체크
// checkSubjectTitle 미들웨어로 user 내에서 과목명이 겹치는 것이 있는지 체크

export const recordActive = async (req, res) => {
  const {
    user,
    subject,
    body: { token, startTime, endTime, lapse },
  } = req;
  console.log(user, subject, lapse);
  //   const newLapse = await Lapse.create({
  //     user_id
  // subject_id
  // l_date
  // l_start_time
  // l_end_time
  // l_lapse
  //   })
};

export const getSubject = async (req, res) => {
  // findUser
  const { user } = req;
  const { subjects } = await user.populate("subjects");
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
