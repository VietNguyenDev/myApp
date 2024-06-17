import express from "express";
import { getOrderItemController } from "../controllers/OrderItem/getOrderItem.controller.js";
import { createOrderItemController } from "../controllers/OrderItem/createOrderItem.controller.js";
import { updateOrderItemController } from "../controllers/OrderItem/updateOrderItem.controller.js";
import { deleteOrderItemController } from "../controllers/OrderItem/deleteOrderItem.controller.js";
import { authenticate } from "../../middleware/authentication.js";
import { getAllOrderItemController } from "../controllers/OrderItem/getAllOrderItem.controller.js";

const router = express.Router();

router.get("/getOrderItem/:id", authenticate, getOrderItemController);
router.get("/getAllOrderItem", authenticate, getAllOrderItemController);
router.post("/createOrderItem", authenticate, createOrderItemController);
router.put("/updateOrderItem/:id", authenticate, updateOrderItemController);
router.delete("/deleteOrderItem/:id", authenticate, deleteOrderItemController);

export default router;
