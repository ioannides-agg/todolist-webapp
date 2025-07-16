require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

app.listen(3000, () => console.log("Server running on http://localhost:3000"));