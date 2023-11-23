import { Request, Response } from "express";
import { UserServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const result = await UserServices.createUserIntoDB(userData);

    res.status(201).json({
      success: true,
      message: "User is created successfully",
      data: result,
    });
  } catch (error) {
    res.send(404).json({
      success: false,
      message: "User not found",
      error: error,
    });
  }
};

export const UserControllers = {
  createUser,
};
