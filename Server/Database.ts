import { User } from "../Client/src/models/user";
// import path from "path";

import { DBModel } from "./Database/db-schema";
import { Low, JSONFile } from "lowdb";
// const file = path.join(__dirname, "./data/database.json");
const adapters = new JSONFile<DBModel>("db.json");
export interface TDataBase {
  user: User[];
}
export const dataBase = new Low<DBModel>(adapters);
