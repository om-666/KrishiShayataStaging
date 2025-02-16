const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/dbConfig');
const authRoutes = require('./routes/authRoutes');
const User = require('./models/userModel');

require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to DB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
// Route For Adhar Details in Dashboard
app.get('/api/user/:aadhar', async (req, res) => {
  const { aadhar } = req.params;
  const user = await User.findOne({ aadhar });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
});

// Error Handler Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

module.exports = app;
