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
      const user = getUser("firstName", firstName);
      if (user.length) {
        res.json({ signupError: "User already exist, try signing in" });
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
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/signin",
    failureMessage: true,
    failureFlash: true,
  }),
  async (req: Request, res: Response) => {
    const user: User = req.body;
    if (req.body.remember) {
      req.session!.cookie.maxAge = 24 * 60 * 60 * 1000 * 30; // Expire in 30 days
    } else {
      req.session!.cookie.expires = undefined;
    }

    res.status(200).json({ user: req.user });
  }
);

export default router;
