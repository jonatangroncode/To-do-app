const express = require('express')
const connectDB = require('./config/db')
require('dotenv').config()
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');
const authRoutes = require('./routes/authRoutes');


connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/todos', todoRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;
