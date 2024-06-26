import express from "express";
import { createController } from "../controllers/Product/createProduct.controller.js";
import { getListController } from "../controllers/Product/getList.controller.js";
import { getDetailController } from "../controllers/Product/getDetail.controller.js";
import { updateController } from "../controllers/Product/updateProduct.controller.js";
import { removeController } from "../controllers/Product/deleteProduct.controller.js";
import { authenticate } from "../../middleware/authentication.js";
import { checkPermission } from "../../middleware/permission.js";
import { upload } from "../../middleware/uploadImg.js";

const router = express.Router();

router.get("/getList", getListController);
router.get("/getDetail/:productId", getDetailController);
router.post(
  "/create",
  authenticate,
  checkPermission,
  upload.single("file"),
  createController
);
router.put(
  "/update/:productId",
  authenticate,
  checkPermission,
  upload.single("file"),
  updateController
);
router.delete(
  "/remove/:productId",
  authenticate,
  checkPermission,
  removeController
);

export default router;
