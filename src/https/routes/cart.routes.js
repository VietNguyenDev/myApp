import express from "express";
import { getCartListController } from "../controllers/Cart/getCartList.controller.js";
import { createFavoriteController } from "../controllers/Favorite/createFavorite.controller.js";
import { deleteProdFromCart } from "../services/cart.service.js";

const router = express.Router();

router.get("/getAll", getCartListController);
router.post("/add", createFavoriteController);
router.delete("/delete", deleteProdFromCart);

export default router;
