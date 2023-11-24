/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from "mongoose";
import { IUser, TAddress, TName, TOrder, UserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const nameSchema = new Schema<TName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const addressSchema = new Schema<TAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const orderSchema = new Schema<TOrder[]>([
  {
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
]);

const userSchema = new Schema<IUser, UserModel>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: {
    type: nameSchema,
    required: true,
  },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: { type: [String], required: true },
  address: {
    type: addressSchema,
    required: true,
  },
  orders: [
    {
      type: orderSchema,
      required: false,
    },
  ],
});

userSchema.pre("save", async function (next) {
  // pre middleware for password hashing which will work on create() and save()
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

userSchema.post("save", function (doc, next) {
  // post middleware for password
  doc.password = "";
  next();
});

userSchema.statics.isUserExists = async function (id: string) {
  //creating static method here
  const existingUser = await User.findOne({ userId: id });
  return existingUser;
};

export const User = model<IUser, UserModel>("User", userSchema);
