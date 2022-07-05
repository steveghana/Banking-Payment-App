import {
  User,
  BankAccount,
  Contact,
  BankAccountPayload,
} from "../Models/models";

export interface DBModel {
  user: User[];
  bankAccout: BankAccount[];
  contacts: Contact[];
}
