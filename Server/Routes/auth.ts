import { User } from "../Models/models";
import bcrypt from "bcryptjs";
import local from "passport-local";
import { getUser } from "./helper";
import { PassportStatic } from "passport";
const LocalStrategy = local.Strategy;
export const initialiser = (passport: PassportStatic) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "userName" },
      async (userName: string, password: string, done: Function) => {
        console.log("hello");
        const user = await getUser(userName);
        const comparepass = await bcrypt.compare(password, user?.password);
        try {
          if (user === null) {
            done(null, false, { message: "User doesn't exist, try signin up" });
          }
          if (!comparepass) {
            done(null, false, { message: "Invalid password" });
          }
          return done(null, user);
        } catch (error: any) {
          throw new Error(error);
        }
      }
    )
  );
  //@ts-ignore
  passport.serializeUser((user: User, done: Function) => {
    done(null, user);
  });
  passport.deserializeUser((id: string, done: Function) => {
    done(null, id);
  });
};
