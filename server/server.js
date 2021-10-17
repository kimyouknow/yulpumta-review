import express from "express";
import cookieParser from "cookie-parser";
import routes from "./routes";
import userRouter from "./router/userRouter";
import subjectRouter from "./router/subjectRouter";
import statRouter from "./router/statRouter";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(routes.api, userRouter);
app.use(routes.api, subjectRouter);
app.use(routes.api, statRouter);

export default app;
