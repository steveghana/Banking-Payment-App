import express from "express";
import { Request, Response } from "express";
import { User } from "../Models/models";
import passport from "passport";
import local from "passport-local";

const LocalStrategy = local.Strategy;

passport.use(
  new LocalStrategy((userName: string, password: string, done: Function) => {
    try {
      console.log(userName);
    } catch (error: any) {
      throw new Error(error);
    }
    return done(null, userName);
  })
);
//@ts-ignore
passport.serializeUser((user: User, done) => {
  console.log(user);
  done(null, user.id);
});
const router = express.Router();
router.post(
  "/login",
  // passport.authenticate("local"),
  (req: Request, res: Response): void => {
    console.log("something");
    if (req.body.remember) {
      req.session!.cookie.maxAge = 24 * 60 * 60 * 1000 * 30; // Expire in 30 days
    } else {
      req.session!.cookie.expires = undefined;
    }

    res.send({ user: req.user });
  }
);
export default router;
