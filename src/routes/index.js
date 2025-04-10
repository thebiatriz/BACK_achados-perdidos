import { Router } from "express";
import CategoryController from "../controllers/CategoryController.js";

const router = Router();

// routes to the category
router.post("/categoria", CategoryController.create);
router.get("/categoria", CategoryController.findAll);
router.get("/categoria/:id", CategoryController.findById);
router.delete("/categoria/:id", CategoryController.delete);


export { router };