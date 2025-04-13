import { Router } from "express";
import categoryRoutes from "./categoryRoutes.js";
import userRoutes from "./userRoutes.js"

const router = Router();

router.use("/api/categorias", categoryRoutes);
router.use("/api/usuarios", userRoutes);

export { router };