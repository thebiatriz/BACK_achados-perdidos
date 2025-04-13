import { Router } from 'express';
import {
  createItem,
  getAllItems,
  getItemById,
  updateItemByCodigo,
  deleteItemByCodigo,
} from '.../controllers/ItemController.js';

const router = Router();

// Criar novo item
router.post('/', createItem);

// Listar todos os itens (com filtros e busca opcionais)
router.get('/', getAllItems);

// Buscar item por ID
router.get('/:id', getItemById);

// Atualizar item pelo código único
router.put('/editar/:codigo', updateItemByCodigo);

// Remover item pelo código único
router.delete('/remover/:codigo', deleteItemByCodigo);

export default router;
