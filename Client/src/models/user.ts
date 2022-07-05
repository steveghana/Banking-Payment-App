
export interface User {
    id:string,
    uuid: string,
firstName : string,
userName:string;
lastName :string,
confirmPassword: string,
phoneNumber : string,
password: string,
email: string,
balance : string,
createdAt: Date;
modifiedAt:Date;
}

export type SignInPayload = Pick<User, 'userName' | 'password'> &{
    remember?:boolean
}
export type SignUpPayload = Pick<User, 'firstName' | 'lastName' | 'userName' | 'password' | 'confirmPassword' | 'email'>
