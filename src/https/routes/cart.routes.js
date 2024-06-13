import express from "express";
import { getCartListController } from "../controllers/Cart/getCartList.controller.js";
import { authenticate } from "../../middleware/authentication.js";
import { addProdController } from "../controllers/Cart/addProd.controller.js";
import { deleteProdController } from "../controllers/Cart/deleteProd.controller.js";

const router = express.Router();

router.get("/getAll/:userId", authenticate, getCartListController);
router.post("/add", authenticate, addProdController);
router.delete("/delete/:id", authenticate, deleteProdController);

export default router;
