const express = require('express')
const connectDB = require('./config/db')
require('dotenv').config()
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/todos', todoRoutes);

module.exports = app;
