import express from "express";
import { getOrderItemController } from "../controllers/OrderItem/getOrderItem.controller.js";
import { createOrderItemController } from "../controllers/OrderItem/createOrderItem.controller.js";
import { updateOrderItemController } from "../controllers/OrderItem/updateOrderItem.controller.js";
import { deleteOrderItemController } from "../controllers/OrderItem/deleteOrderItem.controller.js";

const router = express.Router();

router.get("/getOrderItems", getOrderItemController);
router.post("/createOrderItem", createOrderItemController);
router.put("/updateOrderItem", updateOrderItemController);
router.delete("/deleteOrderItem", deleteOrderItemController);

export default router;
