import express from "express";
import cookieParser from "cookie-parser";
import routes from "./routes";
import userRouter from "./router/userRouter";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(routes.api, userRouter);

export default app;
