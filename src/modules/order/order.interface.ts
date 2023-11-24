import { Model } from "mongoose";

export interface IOrder {
  productName: string;
  price: number;
  quantity: number;
}

export type OrderModel = Model<IOrder>;
