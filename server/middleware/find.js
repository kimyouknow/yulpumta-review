import Subject from '../models/Subject';
import User from '../models/User';

export const findUser = async (req, res, next) => {
  const {
    body: { token },
  } = req;
  const user = await User.findByToken(token);
  if (user instanceof Error || !user)
    return res.json({
      success: false,
      message: '일치하는 유저를 찾지 못했습니다.',
    });
  req.user = user;
  next();
};

export const findSubejct = async (req, res, next) => {
  const {
    body: { subject_id },
    user,
  } = req;
  const subject = await Subject.findOne({ user_id: user._id, _id: subject_id });
  if (!subject)
    return res.json({
      success: false,
      message: '일치하는 과목을 찾지 못했습니다.',
    });
  req.subject = subject;
  next();
};

export const checkSubjectTitle = async (req, res, next) => {
  const {
    body: { title },
    user,
  } = req;
  const exists = await Subject.exists({ user_id: user._id, title });
  if (exists)
    return res.json({
      success: false,
      message: 'duplicate',
    });
  next();
};
