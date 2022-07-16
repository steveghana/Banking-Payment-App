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
let file = path.join(__dirname, "./data/data.json");
const adapter = new FileSync<DBModel>(file);
export const db = low(adapter);
export const seedDatabase = () => {
  const testSeed = JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), "data", "database-seed.json"),
      "utf-8"
    )
  );

  // seed database with test data
  db.setState(testSeed).write();
  return;
};
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
