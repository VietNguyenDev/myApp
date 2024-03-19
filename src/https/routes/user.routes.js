import express from "express";
import { getAllUserController } from "../controllers/User/getAllUser.controller.js";
import { getUserByIdController } from "../controllers/User/getUserById.controller.js";
import { updateUserController } from "../controllers/User/updateUser.controller.js";
import { removeUserController } from "../controllers/User/removeUser.controller.js";

const router = express.Router();

router.get("/", getAllUserController);
router.get("/:userId", getUserByIdController);
router.put("/update/:userId", updateUserController);
router.delete("/remove/:userId", removeUserController);

export default router;
