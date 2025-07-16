import express from 'express';
import { add, retrieve } from '../controllers/todoController';
import { authToken } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/add', authToken, add);
router.get('/retrieve', authToken, retrieve);

export default router;