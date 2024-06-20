import express from "express";
import { createPaymentController } from "../controllers/Payment/createPayment.controller.js";
import { getAllPaymentController } from "../controllers/Payment/getAllPayment.controller.js";
import { getPaymentByOrderIdController } from "../controllers/Payment/getPaymentByOrderId.controller.js";
import { getPaymentByStatusController } from "../controllers/Payment/getPaymentByStatus.controller.js";
import { getPaymentByUserIdController } from "../controllers/Payment/getPaymentByUserId.controller.js";
import { getPaymentByIdController } from "../controllers/Payment/getPaymentById.controller.js";
import { updatePaymentController } from "../controllers/Payment/updatePayment.controller.js";

const router = express.Router();

router.post("/createPayment", createPaymentController);
router.get("/getPayment", getAllPaymentController);
router.get("/getPaymentById/:id", getPaymentByIdController);
router.get("/getPayment/user/:userId", getPaymentByUserIdController);
router.get("/getPayment/order/:orderId", getPaymentByOrderIdController);
router.get("/getPayment/status/:status", getPaymentByStatusController);
router.put("/updatePayment/:id", updatePaymentController);

export default router;
