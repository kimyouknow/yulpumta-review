import express from "express";
import { getDailyLapses, getStat } from "../controller/statController";
import { findUser } from "../middleware/find";

import routes from "../routes";

const statRouter = express.Router();

statRouter.post(routes.getStat, findUser, getStat);
statRouter.post(routes.getDailyLapse, findUser, getDailyLapses);

export default statRouter;
