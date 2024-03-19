import express from "express";
import { createController } from "../controllers/Product/createProduct.controller.js";
import { getListController } from "../controllers/Product/getList.controller.js";
import { getDetailController } from "../controllers/Product/getDetail.controller.js";
import { updateController } from "../controllers/Product/updateProduct.controller.js";
import { removeController } from "../controllers/Product/deleteProduct.controller.js";

const router = express.Router();

router.get("/getList", getListController);
router.get("/getDetail/:productId", getDetailController);
router.post("/create", createController);
router.put("/update/:productId", updateController);
router.delete("/remove/:productId", removeController);

export default router;
