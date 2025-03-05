const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const connectDB = require('./config/dbConfig'); // DB connection
const authRoutes = require('./routes/authRoutes'); // Auth routes
const User = require('./models/userModel'); // User Model
const FormData = require('./models/formDataModel'); // Form Data Model

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parses JSON requests

// Connect to MongoDB
connectDB()
    .then(() => console.log("✅ MongoDB Connected Successfully"))
    .catch((err) => {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1); // Exit process if DB connection fails
    });

// Auth Routes
app.use('/api/auth', authRoutes);

// Route to Fetch User by Aadhar (For Dashboard)
app.get('/api/user/:aadhar', async (req, res) => {
    try {
        const { aadhar } = req.params;
        const user = await User.findOne({ aadhar });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ message: 'Error fetching user data', error: error.message });
    }
});

// Route to Save Form Data
app.post('/api/submit', async (req, res) => {
    try {
        const formData = new FormData(req.body);
        await formData.save();
        res.status(200).json({ message: "✅ Data saved successfully!" });
    } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).json({ message: "❌ Error saving data", error: error.message });
    }
});

// Error Handler Middleware
app.use((err, req, res, next) => {
    console.error("Server Error:", err.stack);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// ✅ Export the app object
module.exports = app;
