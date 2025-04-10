const express = require('express');
const router = express.Router();
const itemController = require('../controllers/ItemController');

// Criar novo item
router.post('/', itemController.createItem);

// Listar todos os itens (com filtros e busca opcionais)
router.get('/', itemController.getAllItems);

// Buscar item por ID
router.get('/:id', itemController.getItemById);

// Atualizar item pelo ID
router.put('/:id', itemController.updateItemById);

// Remover item pelo ID
router.delete('/:id', itemController.deleteItemById);

module.exports = router;
