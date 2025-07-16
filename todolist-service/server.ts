import dotenv from 'dotenv';
dotenv.config();

import express, { Application } from 'express';
import cors from 'cors';

import todoRoutes from './routes/todoRoutes';

const app: Application = express();

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use('/api/todo', todoRoutes);

app.listen(3001, () => console.log(`Server running on http://localhost:3001`));