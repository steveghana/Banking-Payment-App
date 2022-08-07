export interface User {
  id: string;
  uuid: string;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  email: string;
  phoneNumber: string;
  confirmPassword: string;
  balance: number;
  avatar: string;
  defaultPrivacyLevel: DefaultPrivacyLevel;
  createdAt: Date;
  modifiedAt: Date;
}
export enum DefaultPrivacyLevel {
  public = "public",
  private = "private",
  contacts = "contacts",
}
export type UserSettingsPayload = Pick<
  User,
  "firstName" | "lastName" | "email" | "phoneNumber" | "defaultPrivacyLevel"
>;

export type SignInPayload = Pick<User, "userName" | "password"> & {
  remember?: boolean;
};
export type SignUpPayload = Pick<
  User,
  | "firstName"
  | "lastName"
  | "userName"
  | "password"
  | "confirmPassword"
  | "email"
>;
export interface BankAccount {
  id: string;
  uuid: string;
  userId: string;
  bankName: string;
  accountNumber: string;
  routingNumber: string;
  isDeleted: boolean;
  createdAt: Date;
  modifiedAt: Date;
}

export type BankAccountPayload = Pick<
  BankAccount,
  "userId" | "bankName" | "accountNumber" | "routingNumber"
>;
