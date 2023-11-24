import { Model } from "mongoose";

export type TName = {
  firstName: string;
  lastName: string;
};

export type TAddress = {
  street: string;
  city: string;
  country: string;
};

export type TOrder = {
  productName: string;
  price: number;
  quantity: number;
};

export interface IUser {
  userId: number;
  username: string;
  password: string;
  fullName: TName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  orders?: TOrder[];
}
export interface UserModel extends Model<IUser> {
  isUserExists(id: number): Promise<IUser | null>; //using static here
}
// export type UserModel = Model<IUser>;
