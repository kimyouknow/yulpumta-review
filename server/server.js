import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
// app.use(express.text());
app.use(express.json());
// app.use(
//   session({
//     secret: process.env.COOKIE_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     store: MongoStore.create({
//       mongoUrl: process.env.DB_URL,
//     }),
//   })
// );
const handleListenning = () =>
  console.log(`✅ Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListenning);
