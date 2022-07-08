// import { dataBase } from "../Database";
import { User } from "../Models/models";
import bcryptjs from "bcryptjs";
import shortid from "shortid";
import { v4 } from "uuid";
import { db } from "../server";
const user: any[] = [];
const USER_TABLE = "users";
const getBy = (tableName: string, key: string, value: any) => {
  return (
    db
      .get(tableName)
      //@ts-ignore
      .filter({ [`${key}`]: value })
      .value()
  );
};
export const getUser = (key: string, username: string) =>
  getBy(USER_TABLE, key, username);
export const saveUser = (payload: User) =>
  db.get(USER_TABLE).push(payload).write();

export const addUser = (userDetails: User) => {
  const password = bcryptjs.hashSync(userDetails.password);
  const user: User = {
    id: shortid()!,
    uuid: v4(),
    email: userDetails.email!,
    username: userDetails.username!,
    firstName: userDetails.firstName!,
    lastName: userDetails.lastName!,
    password,
    createdAt: new Date(),
  };
  saveUser(user);
  return user;
};
