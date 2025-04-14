import { Router } from "express";
import {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
  getItensUser,
} from "../controllers/ItemController.js";

import auth from "../middlewares/auth.js";

const router = Router();

// Create a new item
router.post("/", auth, createItem);

// List all items (with filters and indirect search)
router.get("/", getAllItems);

// Get item by ID
router.get("/:id", getItemById);

// Update item by ID
router.put("/:id", auth, updateItem);

// Delete item by ID
router.delete("/:id", auth, deleteItem);

// List all items of a user
router.get("/conta/meus-itens/", auth, getItensUser);
export default router;