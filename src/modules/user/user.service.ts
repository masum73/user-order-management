import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (userData: IUser) => {
  if (await User.findOne({ userId: userData.userId })) {
    // checking if the is user is already then throwing an error msg
    throw new Error("User already exits!");
  }
  const result = await User.create(userData);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find().select(
    "-_id -password -fullName._id -orders._id -address._id -__v"
  ); // hiding unwanted fields
  return result;
};

const getSingleUserFromDB = async (id: number) => {
  if (!(await User.isUserExists(id))) {
    // checking if the is user is not found then throwing an error msg
    throw new Error("User not found!");
  }
  const result = await User.findOne({ userId: id }).select(
    "-_id -password -orders -fullName._id -address._id -__v"
  ); // hiding unwanted fields

  return result;
};

const updateUserIntoDB = async (id: number, userData: IUser) => {
  if (!(await User.isUserExists(id))) {
    // checking if the is user is not found then throwing an error msg
    throw new Error("User not found!");
  }
  const result = await User.updateOne({ userId: id }, userData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteUser = async (id: number) => {
  if (!(await User.isUserExists(id))) {
    // checking if the is user is not found then throwing an error msg
    throw new Error("User not found!");
  }
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
