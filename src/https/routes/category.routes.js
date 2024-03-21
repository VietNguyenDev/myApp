import express from "express";
import { createCategoryController } from "../controllers/Category/createCategory.controller.js";
import { getAllCategoriesController } from "../controllers/Category/getAllCategories.controller.js";
import { getDetailCategoryController } from "../controllers/Category/getDetailCategory.controller.js";
import { updateCategoryController } from "../controllers/Category/updateCategory.controller.js";
import { deleteCategoryController } from "../controllers/Category/deleteCategory.controller.js";
import { authenticate } from "../../middleware/authentication.js";
import { checkPermission } from "../../middleware/permission.js";

const router = express.Router();

router.get("/get", getAllCategoriesController);
router.get("/getDetail/:categoryId", getDetailCategoryController);
router.post("/create", authenticate, checkPermission, createCategoryController);
router.put(
  "/update/:categoryId",
  authenticate,
  checkPermission,
  updateCategoryController
);
router.delete(
  "/remove/:categoryId",
  authenticate,
  checkPermission,
  deleteCategoryController
);

export default router;
