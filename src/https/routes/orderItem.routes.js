import express from "express";
import { getOrderItemController } from "../controllers/OrderItem/getOrderItem.controller.js";
import { createOrderItemController } from "../controllers/OrderItem/createOrderItem.controller.js";
import { updateOrderItemController } from "../controllers/OrderItem/updateOrderItem.controller.js";
import { deleteOrderItemController } from "../controllers/OrderItem/deleteOrderItem.controller.js";
import { authenticate } from "../../middleware/authentication.js";

const router = express.Router();

router.get("/getOrderItems", authenticate, getOrderItemController);
router.post("/createOrderItem", authenticate, createOrderItemController);
router.put("/updateOrderItem", authenticate, updateOrderItemController);
router.delete("/deleteOrderItem", authenticate, deleteOrderItemController);

export default router;
