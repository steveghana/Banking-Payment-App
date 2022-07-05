import express from "express";
import { Request, Response } from "express";
import { User } from "../Models/models";
// import bcryptjs from "bcryptjs";
import { userValidator } from "./validators";
import { validateMiddleware } from "./middleware";
const userDb: any = [];
const router = express.Router();

router.post(
  "/",
  userValidator,
  validateMiddleware(userValidator),
  (req: Request, res: Response) => {
    const user: User = req.body;
    // console.log(user);
    // bcryptjs.hash(req.body.password, 12);
    userDb.push(user);
    res.json({ user });
  }
);

export default router;
