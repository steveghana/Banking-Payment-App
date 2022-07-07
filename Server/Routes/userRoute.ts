import express from "express";
import { Request, Response } from "express";
import passport from "passport";
import { User } from "../Models/models";
import shortid from "shortid";
import { v1 } from "uuid";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { addUser } from "./helper";
import { getUser } from "./helper";
import { userValidator } from "./validators";
import { validateMiddleware } from "./middleware";
const userDb: any = [];
const router = express.Router();

router.post(
  "/signup",
  userValidator,
  validateMiddleware(userValidator),
  async (req: Request, res: Response) => {
    const { userName, password, firstName, lastName, email } = req.body;
    let hashedPassword;
    bcrypt
      .hash(password, 10)
      .then((value) => {
        hashedPassword = value;
      })
      .catch((error) => {
        console.log("couldnt hash");
      });
    try {
      const user = await getUser(userName);
      if (user) {
        throw new Error("Username already exist, try signing in");
        return;
      }
      const payload: User = {
        id: shortid(),
        uuid: v1(),
        email: email,
        username: userName,
        firstName: firstName,
        lastName: lastName,
        password,
        createdAt: new Date(),
      };
      const addedUser = await addUser(payload);
      if (addedUser) {
        console.log(userName);
        const token = jwt.sign(req.body, "secret");
        res
          .status(200)
          .json({ user: { userName, firstName, lastName }, token });
      }
    } catch (error: any) {
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
    // if (req.body.remember) {
    //   req.session!.cookie.maxAge = 24 * 60 * 60 * 1000 * 30; // Expire in 30 days
    // } else {
    //   req.session!.cookie.expires = undefined;
    // }
    // console.log(user);
    // bcryptjs.hash(req.body.password, 12);
    // userDb.push(user);
    // res.json({ user: req.user });
  }
);

export default router;
