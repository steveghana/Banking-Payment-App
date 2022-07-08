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
        const user = getUser("users", userName);
        console.log(user);
        if (user === null) {
          done(null, false, { message: "User doesn't exist, try signin up" });
          return;
        }
        const comparepass = await bcrypt.compare(password, user?.password);

        if (!comparepass) {
          done(null, false, { message: "Invalid password" });
          return;
        }
        return done(null, user);
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
