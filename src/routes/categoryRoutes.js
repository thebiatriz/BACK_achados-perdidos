import { Router } from "express";
import CategoryController from "../controllers/CategoryController.js";

const router = Router();

// routes to the category
router.post("/", CategoryController.create);
router.get("/", CategoryController.findAll);
router.get("/:id", CategoryController.findById);
router.delete("/:id", CategoryController.delete);


export default router;