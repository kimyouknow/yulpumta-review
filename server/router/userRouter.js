import express from 'express';
import { handleAuth, login, logout, register, withdrawal } from '../controller/userController';
import { auth } from '../middleware/auth';
import routes from '../routes';

const userRouter = express.Router();
userRouter.get(routes.auth, auth, handleAuth);
userRouter.post(routes.register, register);
userRouter.post(routes.login, login);
userRouter.get(routes.logout, auth, logout);
userRouter.post(routes.withdrawal, withdrawal);

export default userRouter;
