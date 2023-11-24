import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (userData: IUser) => {
  const result = await User.create(userData);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find().select("-password");
  return result;
};

const getSingleUserFromDB = async (id: number) => {
  const result = await User.findOne({ userId: id }).select("-password");

  return result;
};

const updateUserIntoDB = async (id: number, userData: IUser) => {
  const result = await User.updateOne({ userId: id }, userData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteUser = async (id: number) => {
  const result = await User.deleteOne({ userId: id });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
  deleteUser,
};
