import express from "express";
import { getCartListController } from "../controllers/Cart/getCartList.controller.js";
import { createFavoriteController } from "../controllers/Favorite/createFavorite.controller.js";
import { deleteProdFromCart } from "../services/cart.service.js";
import { authenticate } from "../../middleware/authentication.js";

const router = express.Router();

router.get("/getAll", getCartListController);
router.post("/add", authenticate, createFavoriteController);
router.delete("/delete", authenticate, deleteProdFromCart);

export default router;
