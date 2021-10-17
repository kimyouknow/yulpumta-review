import express from "express";
import { getStat } from "../controller/statController";

import routes from "../routes";

const statRouter = express.Router();

statRouter.post(routes.getStat, getStat);

export default statRouter;
