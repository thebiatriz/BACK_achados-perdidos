import { Router } from 'express';
import itemRoutes from './itemRoutes.js';

const router = Router();

router.use('/api/itens', itemRoutes);

export { router };
