import { Router } from "express";
import userRoutes from "./userRoutes.js";
import loginRoutes from "./loginRoutes.js";

const router = Router();

router.use("/api/usuarios", userRoutes);
router.use("/api/login", loginRoutes);

export { router };