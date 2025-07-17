import express from 'express';
import { add, retrieve, updateCompleteness, deleteOne, deleteMany } from '../controllers/todoController';
import { authToken } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/add', authToken, add);
router.get('/retrieve', authToken, retrieve);
router.put('/update', authToken, updateCompleteness);
router.delete('/deleteOne', authToken, deleteOne);
router.delete('/deleteMany', authToken, deleteMany);

export default router;