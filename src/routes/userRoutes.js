import { Router } from 'express';
import UserController from '../controllers/UserController.js';
import auth from '../middlewares/auth.js';

const router = Router();

router.post('/criar/', UserController.createUser);

router.get('/email', UserController.getUserByEmail); 
router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);

router.put('/atualizar/', auth, UserController.updateUser);
router.delete('/deletar/', auth, UserController.deleteUser);

export default router;