import express from "express";
import {
  recordActive,
  addSubject,
  delSubject,
  editSubject,
  getSubject,
} from "../controller/subjectController";
import { checkSubjectTitle, findSubejct, findUser } from "../middleware/find";
import routes from "../routes";

const subjectRouter = express.Router();

subjectRouter.post(routes.recordSubject, findUser, findSubejct, recordActive);
subjectRouter.post(routes.getSubject, findUser, getSubject);
subjectRouter.post(routes.addSubject, findUser, checkSubjectTitle, addSubject);
subjectRouter.post(routes.delSubject, findUser, findSubejct, delSubject);
subjectRouter.post(
  routes.editSubject,
  findUser,
  findSubejct,
  checkSubjectTitle,
  editSubject
);

export default subjectRouter;
