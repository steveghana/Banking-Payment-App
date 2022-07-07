import {
  User,
  BankAccount,
  Contact,
  BankAccountPayload,
} from "../Models/models";

export interface DBModel {
  users: User[];
  bankAccout: BankAccount[];
  contacts: Contact[];
}
