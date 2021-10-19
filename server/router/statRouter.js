import express from "express";
import { getStat } from "../controller/statController";
import { findUser } from "../middleware/find";

import routes from "../routes";

const statRouter = express.Router();

statRouter.post(routes.getStat, findUser, getStat);

export default statRouter;
