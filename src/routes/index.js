import { Router } from "express";
import categoryRoutes from "./categoryRoutes.js";

const router = Router();

router.use("/api/categorias", categoryRoutes);

export { router };