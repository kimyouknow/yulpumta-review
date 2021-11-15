import express from 'express';
import { addPlan, comPlan, delPlan, editPlan, getPlan } from '../controller/planController';
import { findUser } from '../middleware/find';
import routes from '../routes';

const planRouter = express.Router();

planRouter.post(routes.getPlan, findUser, getPlan);
planRouter.post(routes.addPlan, findUser, addPlan);
planRouter.post(routes.editPlan, findUser, editPlan);
planRouter.post(routes.delPlan, findUser, delPlan);
planRouter.post(routes.comPlan, findUser, comPlan);

export default planRouter;
