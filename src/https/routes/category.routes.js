import express from "express";
import { createCategoryController } from "../controllers/Category/createCategory.controller.js";
import { getAllCategoriesController } from "../controllers/Category/getAllCategories.controller.js";
import { getDetailCategoryController } from "../controllers/Category/getDetailCategory.controller.js";
import { updateCategoryController } from "../controllers/Category/updateCategory.controller.js";
import { deleteCategoryController } from "../controllers/Category/deleteCategory.controller.js";

const router = express.Router();

router.get("/get", getAllCategoriesController);
router.get("/getDetail/:categoryId", getDetailCategoryController);
router.post("/create", createCategoryController);
router.put("/update/:categoryId", updateCategoryController);
router.delete("/remove/:categoryId", deleteCategoryController);

export default router;
