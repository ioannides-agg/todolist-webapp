import express from 'express';
import { signup, login, validate, logout } from '../controllers/authController';
import { authToken } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', authToken, validate);

export default router;