import express from "express";
import {
  addSubject,
  delSubject,
  editSubject,
  getSubject,
} from "../controller/subjectController";
import routes from "../routes";
const subjectRouter = express.Router();

subjectRouter.post(routes.getSubject, getSubject);
subjectRouter.post(routes.addSubject, addSubject);
subjectRouter.post(routes.delSubject, delSubject);
subjectRouter.post(routes.editSubject, editSubject);

export default subjectRouter;
