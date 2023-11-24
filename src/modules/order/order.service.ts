import { User } from "../user/user.model";
import { IOrder } from "./order.interface";

const createOrderIntoDB = async (orderData: IOrder, userId: number) => {
  if (userId) {
    const user = await User.findOne({ userId: userId });
    if (user === null) {
      throw new Error("User not found");
    }
    if (user?.orders?.length) {
      user.orders.push(orderData);
      user.save();
      return user;
    } else {
      user.orders = [orderData];
      user.save();
      return user;
    }
  }
};

const getAllOrdersFromDB = async (userId: number) => {
  if (userId) {
    const user = await User.findOne({ userId: userId });
    return user?.orders;
  } else {
    throw new Error("User order not found");
  }
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
};
