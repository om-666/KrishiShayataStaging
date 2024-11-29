const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/dbConfig');
const authRoutes = require('./routes/authRoutes');

require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to DB
connectDB();

// Routes
app.use('/api/auth', authRoutes);

// Error Handler Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

module.exports = app;
