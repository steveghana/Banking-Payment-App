export enum DefaultPrivacyLevel {
  public = "public",
  private = "private",
  contacts = "contacts",
}

export interface User {
  id: string;
  uuid?: string;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  email: string;
  phoneNumber?: string;
  balance?: number;
  avatar?: string;
  defaultPrivacyLevel?: DefaultPrivacyLevel;
  createdAt: Date;
  modifiedAt?: Date;
}
export interface Contact {
  id: string;
  uuid: string;
  userId: string;
  contactUserId: string;
  createdAt: Date;
  modifiedAt: Date;
}
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
  "id" | "userId" | "bankName"
>;
