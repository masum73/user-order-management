import { Request, Response } from "express";
import { OrderServices } from "./order.service";

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const userId = parseInt(req.params.userId);
    const result = await OrderServices.createOrderIntoDB(orderData, userId);

    res.status(201).json({
      success: true,
      message: "User Order is created successfully",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const orders = await OrderServices.getAllOrdersFromDB(userId);
    res.status(200).json({
      success: true,
      message: "Order fetched successfully!",
      data: { orders },
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};

const totalPrice = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const totalPrice = await OrderServices.getTotalPriceFromDB(userId);
    res.status(200).json({
      success: true,
      message: "Total price calculated successfully!",
      data: { totalPrice },
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};
export const OrderControllers = {
  createOrder,
  getAllOrders,
  totalPrice,
};
