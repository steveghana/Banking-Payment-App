import express from "express";
import cors from "cors";
import session from "express-session";
// import logger from ''
import passport from "passport";
import { initialiser } from "./Routes/auth";

import userRoute from "./Routes/userRoute";
import dotenv from "dotenv";
// import { graphqlHTTP } from "express-graphql";
dotenv.config();

const app = express();
initialiser(passport);
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
