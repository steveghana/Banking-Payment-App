import express from "express";
import { Request, Response } from "express";
import passport from "passport";
import { User } from "../Models/models";
import jwt from "jsonwebtoken";
import { addUser } from "../util/helper";
import { getUser } from "../util/helper";
import { userValidator } from "./validators";
import { validateMiddleware } from "./middleware";
const router = express.Router();
router.post(
  "/signup",
  userValidator,
  validateMiddleware(userValidator),
  async (req: Request, res: Response) => {
    const { userName, firstName } = req.body;
    try {
      const user = getUser("userName", userName);
      if (user.length) {
        res.status(400).json({
          signupError: "User already exist, try signing in",
          custom: true,
        });
        return;
      }
      const addedUser = await addUser(req.body);
      if (addedUser) {
        const token = jwt.sign(req.body, "secret");
        res.status(200).json({ user: addUser, token });
      }
    } catch (error: any) {
      res.status(404);
      throw new Error(error);
    }
  }
);
router.post(
  "/signin",
  userValidator,
  validateMiddleware(userValidator),

  async (req: Request, res: Response) => {
    const user: User = req.body;
    passport.authenticate("local", (err, user) => {
      try {
        if (err === "User Signin Error") {
          res
            .status(400)
            .json({ signInError: "User doesn't exist, try sign up" });
        } else if (err === "Invalid Password Error") {
          res.status(400).json({ signInError: "Invalid Password" });
        } else {
          if (req.body.remember) {
            req.session!.cookie.maxAge = 24 * 60 * 60 * 1000 * 30; // Expire in 30 days
          } else {
            req.session!.cookie.expires = undefined;
          }
          res.status(200).json({ user });
        }
      } catch (error: any) {
        throw new Error(error.message);
      }
    })(req, res);
    // console.log(req.logIn);
  }
);

export default router;
