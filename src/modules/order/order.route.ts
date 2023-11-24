import express from "express";
import { OrderControllers } from "./order.controller";

const router = express.Router();

router.put("/users/:userId/orders", OrderControllers.createOrder);
router.get("/users/:userId/orders", OrderControllers.getAllOrders);

export const OrderRoutes = router;
