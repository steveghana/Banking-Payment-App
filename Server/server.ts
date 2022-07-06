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
import { JSONFile, Low, LowSync } from "lowdb";
import userRoute from "./Routes/userRoute";
import dotenv from "dotenv";
// import { graphqlHTTP } from "express-graphql";
dotenv.config();

const app = express();
// const dbFille = fs.readFileSync(
//   path.join(process.cwd(), "data", "database.json"),
//   "utf-8"
// );

// const adapter = new JSONFile<Adapter<DBModel>>(dbFille);

// export const db = new Low<Adapter<DBModel>>(adapter);
type Data = {
  posts: string[];
};
const adapter = new JSONFile<Data>("db.json");
const db = new Low<Data>(adapter);

// (async () => {
//   const file =
//   const db = await new Low<DBModel>()
//   // await db.read();
// })();
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
