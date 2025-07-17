import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/authRoutes';
import refreshRoutes from './routes/refreshRoutes';

const app = express();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/auth', refreshRoutes);

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
