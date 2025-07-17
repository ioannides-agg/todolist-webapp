require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser')

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }));

app.use(cookieParser());

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const refreshRoutes = require('./routes/refreshRoutes');
app.use('/api/auth', refreshRoutes)

app.listen(3000, () => console.log("Server running on http://localhost:3000"));