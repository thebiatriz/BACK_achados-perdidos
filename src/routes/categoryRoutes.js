import { Router } from "express";
import CategoryController from "../controllers/CategoryController.js";

const router = Router();

// routes to the category
router.post("/", CategoryController.createCategory);
router.get("/", CategoryController.findAllCategory);
router.get("/:id", CategoryController.findCategoryById);
router.delete("/:id", CategoryController.deleteCategory);
router.put("/:id", CategoryController.updatedCategory);


export default router;