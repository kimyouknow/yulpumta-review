import express from 'express';
import { addPlan, comPlan, delPlan, editPlan, getPlan } from '../controller/planController';
import { findPlan, findUser } from '../middleware/find';
import routes from '../routes';

const planRouter = express.Router();

planRouter.post(routes.getPlan, findUser, getPlan);
planRouter.post(routes.addPlan, findUser, addPlan);
planRouter.post(routes.editPlan, findUser, findPlan, editPlan);
planRouter.post(routes.delPlan, findUser, findPlan, delPlan);
planRouter.post(routes.comPlan, findUser, findPlan, comPlan);

export default planRouter;
