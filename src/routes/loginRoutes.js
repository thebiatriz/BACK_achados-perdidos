import { Router } from "express";
import LoginController from "../controllers/LoginController.js";

const router = Router();
router.post("/", LoginController.login);

export default router;
