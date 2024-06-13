import express from "express";
import { createFavoriteController } from "../controllers/Favorite/createFavorite.controller.js";
import { getAllFavoriteController } from "../controllers/Favorite/getFavorite.controller.js";
import { deleteFavoriteProdController } from "../controllers/Favorite/deleteFavoriteProd.controller.js";
import { authenticate } from "../../middleware/authentication.js";

const router = express.Router();

router.post("/create", authenticate, createFavoriteController);
router.get("/getList", authenticate, getAllFavoriteController);
router.delete("/delete/:id", authenticate, deleteFavoriteProdController);

export default router;
