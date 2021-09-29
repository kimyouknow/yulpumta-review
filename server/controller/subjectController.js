import User from "../models/User";
import Subject from "../models/Subject";

export const getSubject = async (req, res) => {
  const {
    body: { token },
  } = req;
  const user = await User.findByToken(token);
  if (user instanceof Error || !user)
    return res.json({
      success: false,
      message: "일치하는 유저를 찾지 못했습니다.",
    });
  const { subjects } = await user.populate("subjects");
  return res.json({
    success: true,
    subjects,
  });
};

export const addSubject = async (req, res) => {
  const {
    body: { token, title, color },
  } = req;
  const user = await User.findByToken(token);
  if (user instanceof Error || !user)
    return res.json({
      success: false,
      message: "일치하는 유저를 찾지 못했습니다.",
    });
  const exists = await Subject.exists({ user_id: user._id, title });
  if (exists)
    return res.json({
      success: false,
      message: "duplicate",
    });
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
  const {
    body: { token, subject_id, new_title, new_color },
  } = req;
  const user = await User.findByToken(token);
  if (user instanceof Error || !user)
    return res.json({
      success: false,
      message: "일치하는 유저를 찾지 못했습니다.",
    });
  const exists = await Subject.exists({ _id: subject_id });
  if (!exists)
    return res.json({
      success: false,
      message: "일치하는 과목을 찾지 못했습니다.",
    });
  const duplicate = await Subject.exists({ title: new_title });
  if (duplicate)
    return res.json({
      success: false,
      message: "duplicate",
    });
  let newSubject;
  try {
    newSubject = await Subject.findByIdAndUpdate(subject_id, {
      title: new_title,
      color: new_color,
    });
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      message: err.message,
    });
  } finally {
    return res.json({
      success: true,
      newSubject,
    });
  }
};
export const delSubject = async (req, res) => {
  const {
    body: { token, subject_id },
  } = req;
  const user = await User.findByToken(token);
  if (user instanceof Error || !user)
    return res.json({
      success: false,
      message: "일치하는 유저를 찾지 못했습니다.",
    });
  const exists = await Subject.findById(subject_id);
  if (!exists)
    return res.json({
      success: false,
      message: "일치하는 과목을 찾지 못했습니다.",
    });
  console.log(exists);
  console.log(user);
  if (String(exists.user_id) !== String(user._id))
    return res.json({
      success: false,
      message: "유저 ID가 일치하지 않습니다.",
    });
  try {
    await Subject.findByIdAndDelete(subject_id);
    await user.subjects.splice(user.subjects.indexOf(subject_id), 1);
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
