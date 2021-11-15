import User from '../models/User';
export const auth = async (req, res, next) => {
  let token = req.cookies.user_auth;
  const user = await User.findByToken(token);
  if (user instanceof Error || !user)
    return res.json({
      isAuth: false,
      error: true,
      message: user?.message,
    });
  req.token = token;
  req.user = user;
  next();
};
