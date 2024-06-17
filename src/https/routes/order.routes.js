import express from "express";
import { createOrderDetailController } from "../controllers/Order/createOrder.controller.js";
import { getOrderDetailByIdController } from "../controllers/Order/getOrder.controller.js";
import { authenticate } from "../../middleware/authentication.js";

const router = express.Router();

router.post("/order", authenticate, createOrderDetailController);
router.get("/order/:id", authenticate, getOrderDetailByIdController);

export default router;
