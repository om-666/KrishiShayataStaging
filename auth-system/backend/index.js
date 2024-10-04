const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/auth-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Connection Error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  aadhar: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Routes
// Signup Route
app.post('/signup', async (req, res) => {
  const { fullName, phone, aadhar, address, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists!' });

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ fullName, phone, aadhar, address, email, password: hashedPassword });
    await newUser.save();

    res.status(200).json({ message: 'Signup successful!' });
  } catch (err) {
    res.status(500).json({ message: 'Error signing up user', error: err });
  }
});

// Login Route (remains unchanged)
app.post('/login', async (req, res) => {
  const { aadhar, password } = req.body; // Get Aadhar and password from the request body

  try {
    // Check if user exists with the provided Aadhar
    const user = await User.findOne({ aadhar });
    if (!user) return res.status(401).json({ message: 'Invalid Aadhar number or password!' });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid Aadhar number or password!' });

    res.status(200).json({ message: 'Login successful!' });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in user', error: err });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
