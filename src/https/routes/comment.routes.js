import express from "express";
import { getAllCommentController } from "../controllers/Comment/getAllComment.controller.js";
import { createCommentController } from "../controllers/Comment/createComment.controller.js";
import { updateCommentController } from "../controllers/Comment/updateComment.controller.js";
import { deleteCommentController } from "../controllers/Comment/deleteComment.controller.js";
import { authenticate } from "../../middleware/authentication.js";

const router = express.Router();

router.get("/getAll", getAllCommentController);
router.post("/create", authenticate, createCommentController);
router.put("/update/:commentId", authenticate, updateCommentController);
router.delete("/delete/:commentId", authenticate, deleteCommentController);

export default router;
