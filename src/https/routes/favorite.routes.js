import express from "express";
import { createFavoriteController } from "../controllers/Favorite/createFavorite.controller.js";
import { getAllFavoriteController } from "../controllers/Favorite/getFavorite.controller.js";
import { deleteFavoriteProdController } from "../controllers/Favorite/deleteFavoriteProd.controller.js";

const router = express.Router();

router.post("/create", createFavoriteController);
router.get("/getList", getAllFavoriteController);
router.delete("/delete", deleteFavoriteProdController);

export default router;
