import { User } from "../Models/models";
import bcrypt from "bcryptjs";
import local from "passport-local";
import { getUser } from "../util/helper";
import { PassportStatic } from "passport";
const LocalStrategy = local.Strategy;
export const initialiser = (passport: PassportStatic) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "userName" },
      async (userName: string, password: string, done: Function) => {
        try {
          const user = getUser("userName", userName);
          if (user.length < 1) {
            done("User Signin Error");
            return;
          }
          const comparepass = await bcrypt.compare(password, user[0]?.password);
          if (comparepass === false) {
            done("Invalid Password Error");
            return;
          }
          return done(null, user);
        } catch (error: any) {
          throw new Error(error.message);
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
