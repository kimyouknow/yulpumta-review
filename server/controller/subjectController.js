import Day from "../models/Day";
import Lapse from "../models/Lapse";
import Subject from "../models/Subject";
// findUser 미들웨어로 token으로 로그인한 유저의 정보를 db에서 찾는 과정을 정리
// findSubject 미들웨어로 user 내에서 요청한 과목이 있는지 체크
// checkSubjectTitle 미들웨어로 user 내에서 과목명이 겹치는 것이 있는지 체크
const s_today = String(new Date()).substring(0, 15);

export const recordActive = async (req, res) => {
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
      console.log("오늘날짜 없음");
      const newDay = new Day({
        user_id: user._id,
        subject_id: subject._id,
        d_date: s_today,
      });
      await newDay.save();
      const newLapse = new Lapse({
        user_id: user._id,
        subject_id: subject._id,
        l_date: newDay._id,
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
  const data = await Subject.find({ user_id: user._id }).populate({
    path: "dates",
    populate: {
      path: "lapses",
      model: "Lapse",
    },
  });
  // subejct 각각의 요소들에 대해서 최신날짜 데이터 고르기 subject.dates[subject.dates.length - 1]
  // 최신날짜에서 lpases를 추출하고 합을 todayTotalT에 넣고 반환
  const subjects = data.map((subject) => {
    const { _id, title, user_id, color } = subject;
    const todayLapses = subject.dates[subject.dates.length - 1].lapses;
    const todayTotalT = todayLapses.reduce((acc, cur) => acc + cur.l_lapse, 0);
    return { _id, title, user_id, color, todayTotalT };
  });
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
    subject: { user_id, _id, dates },
  } = req;
  if (String(user_id) !== String(user._id))
    return res.json({
      success: false,
      message: "유저 ID가 일치하지 않습니다.",
    });
  try {
    await Subject.findByIdAndDelete(_id);
    await user.subjects.splice(user.subjects.indexOf(_id), 1);
    // dates.forEach(async (date) => {
    //   await Day.findByIdAndDelete(date);
    //   const lapses = await Day.findById(date).populate({ path: "lapses" });
    //   lapses.forEach(async (lapse) => {
    //     await Lapse.findById(lapse);
    //   });
    // });

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
