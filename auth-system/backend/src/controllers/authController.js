const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');


// Signup
exports.signup = async (req, res) => {
  const { fullName, phone, aadhar, address, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { aadhar }] });
    if (existingUser) return res.status(400).json({ message: 'User already exists with this email or Aadhar!' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ fullName, phone, aadhar, address, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Signup successful!' });
  } catch (err) {
    res.status(500).json({ message: 'Error signing up user', error: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  const { aadhar, password } = req.body;

  try {
    const user = await User.findOne({ aadhar });
    if (!user) {
      return res.status(401).json({ message: 'Invalid Aadhar number or password!' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid Aadhar number or password!' });
    }

    // Generate a JWT token (Optional, but recommended)
    const token = jwt.sign({ aadhar: user.aadhar, id: user._id }, 'your-secret-key', { expiresIn: '1h' });

    // ✅ Return Aadhar and token in the response
    res.status(200).json({
      message: 'Login successful!',
      aadhar: user.aadhar,  // Include Aadhar
      token: token // Include token for authentication
    });

  } catch (err) {
    res.status(500).json({ message: 'Error logging in user', error: err.message });
  }
};

 
 
