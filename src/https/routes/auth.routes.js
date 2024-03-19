import express from "express";
import { signInController } from "../controllers/Auth/signIn.controller.js";
import { logInController } from "../controllers/Auth/logIn.controller.js";

const router = express.Router();

router.post("/sign-in", signInController);
router.post("/log-in", logInController);

export default router;
