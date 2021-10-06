import Subject from "../models/Subject";

export const recordActive = async (req, res) => {
  console.log(req);
};

export const getSubject = async (req, res) => {
  const { user } = req;
  const { subjects } = await user.populate("subjects");
  return res.json({
    success: true,
    message: "",
    subjects,
  });
};

export const addSubject = async (req, res) => {
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
