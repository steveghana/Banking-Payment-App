// import { dataBase } from "../Database";
import { User } from "../Models/models";
const user: any[] = [];
export const getUser = async (username: string) => {
  return await user.find((user: any) => user.username === username);
};
export const addUser = async (payload: User) => {
  let result = null;
  // const existinguser = await getUser(payload.username);
  // if (existinguser) {
  //   result = false;
  //   console.log(existinguser);
  // } else {
  user.push({ ...payload });
  result = payload;
  // }
  return result;
};
