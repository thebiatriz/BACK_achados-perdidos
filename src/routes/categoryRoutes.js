import { Router } from "express";
import CategoryController from "../controllers/CategoryController.js";
import auth from "../middlewares/auth.js";

const router = Router();

// routes to the category
router.post("/criar/", auth, CategoryController.createCategory);

router.get("/", CategoryController.findAllCategory);

router.get("/:id", CategoryController.findCategoryById);

router.delete("/deletar/:id", auth, CategoryController.deleteCategory);

router.put("/atualizar/:id", auth, CategoryController.updateCategory);

export default router;