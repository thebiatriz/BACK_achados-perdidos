import { Router } from "express";
import {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
} from "../controllers/ItemController.js";

const router = Router();

// Create a new item
router.post("/", createItem);

// List all items (with filters and indirect search)
router.get("/", getAllItems);

// Get item by ID
router.get("/:id", getItemById);

// Update item by ID
router.put("/:id", updateItem);

// Delete item by ID
router.delete("/:id", deleteItem);

export default router;