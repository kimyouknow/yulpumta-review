import User from "../models/User";

export const handleAuth = (req, res) => {
  const {
    user: { name },
  } = req;
  return res.json({
    name,
    isAuth: true,
  });
};

export const register = async (req, res) => {
  const {
    body: { email, name, password },
  } = req;
  const exist_name = await User.exists({ name });
  const exist_email = await User.exists({ email });
  if (exist_name)
    return res.json({
      success: false,
      message: "이미 사용중인 이름입니다.",
    });
  if (exist_email)
    return res.json({
      success: false,
      message: "이미 사용중인 메일입니다.",
    });
  const user = new User({
    name,
    email,
    password,
  });
  user.save((err, userInfo) => {
    if (err)
      return res.json({
        success: false,
        message: err,
      });
    return res.json({
      success: true,
    });
  });
};

export const login = async (req, res) => {
  const {
    body: { email, password },
  } = req;
  const user = await User.findOne({ email });
  if (!user)
    return res.json({
      success: false,
      message: `${email}로 가입한 유저가 없습니다.`,
    });
  user.comparePassword(password, (err, isMatch) => {
    if (!isMatch)
      return res.json({
        success: false,
        message: "비밀번호가 맞지 않습니다.",
      });
    user.generateToken((err, user) => {
      if (err)
        return res.json({
          success: false,
          message: "다시 시도해주세요.",
        });
      res.cookie("user_auth", user.token).json({
        success: true,
        name: user.name,
        token: user.token,
      });
    });
  });
};
export const logout = (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, message: err });
    return res.status(200).send({
      success: true,
    });
  });
};

export const withdrawal = (req, res) => console.log(req);
