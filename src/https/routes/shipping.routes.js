import express from "express";
import { getAllShippingDetailController } from "../controllers/Shipping/getAllShippingDetail.controller.js";
import { createShippingDetailController } from "../controllers/Shipping/createShippingDetail.controller.js";
import { updateShippingDetailController } from "../controllers/Shipping/updateShippingDetail.controller.js";
import { removeShippingDetailController } from "../controllers/Shipping/removeShippingDetail.controller.js";

const router = express.Router();

router.get("/getShipping/", getAllShippingDetailController);
router.post("/createShipping", createShippingDetailController);
router.put("/updateShipping/:id", updateShippingDetailController);
router.delete("/deleteShipping/:id", removeShippingDetailController);

export default router;
