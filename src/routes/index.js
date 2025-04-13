import { Router } from "express";
import categoryRoutes from "./categoryRoutes.js";
import userRoutes from "./userRoutes.js";
import loginRoutes from "./loginRoutes.js";

const router = Router();

router.use("/api/categorias", categoryRoutes);
router.use("/api/usuarios", userRoutes);
router.use("/api/login", loginRoutes);

export { router };