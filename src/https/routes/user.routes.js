import express from "express";
import { getAllUserController } from "../controllers/User/getAllUser.controller.js";
import { getUserByIdController } from "../controllers/User/getUserById.controller.js";
import { updateUserController } from "../controllers/User/updateUser.controller.js";
import { removeUserController } from "../controllers/User/removeUser.controller.js";
import { authenticate } from "../../middleware/authentication.js";
import { checkPermission } from "../../middleware/permission.js";
import { upload } from "../../middleware/uploadImg.js";

const router = express.Router();

router.get("/", authenticate, checkPermission, getAllUserController);
router.get("/:userId", authenticate, checkPermission, getUserByIdController);
router.put(
  "/update/:userId",
  authenticate,
  upload.single("file"),
  updateUserController
);
router.delete(
  "/remove/:userId",
  authenticate,
  checkPermission,
  removeUserController
);

export default router;
