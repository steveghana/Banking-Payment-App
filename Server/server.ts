import express from "express";
import cors from "cors";
import session from "express-session";
import logger from "morgan";
import passport from "passport";
import { initialiser } from "./Routes/auth";
import path from "path";
import fs from "fs";
import FileSync from "lowdb/adapters/FileSync";
import { DBModel } from "./Database/db-schema";
import low from "lowdb";
import userRoute from "./Routes/userRoute";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const adapter = new FileSync<DBModel>("db.json");
export const db = low(adapter);
db.defaults({ users: [], bankAccouts: [] }).write();

console.log(db);

initialiser(passport);
app.use(logger("dev"));
app.use(
  cors({
    origin: `http://localhost:${process.env.FRONTENDPORT}`,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "session Secret",
    resave: false,
    saveUninitialized: false,
    unset: "destroy",
  })
);
app.use(passport.initialize());
app.use(passport.session());
// app.use(auth);
app.use("/user", userRoute);
app.listen(5000, () => {
  console.log(`Server listening on localhost 5000`);
});
