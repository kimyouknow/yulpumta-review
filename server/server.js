import express from "express";
import cookieParser from "cookie-parser";
import routes from "./routes";
import userRouter from "./router/userRouter";
import subjectRouter from "./router/subjectRouter";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(routes.api, userRouter);
app.use(routes.api, subjectRouter);

export default app;
