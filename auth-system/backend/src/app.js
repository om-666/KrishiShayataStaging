const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const { MongoClient } = require("mongodb");

const connectDB = require('./config/dbConfig'); // DB connection
const authRoutes = require('./routes/authRoutes'); // Auth routes
const User = require('./models/userModel'); // User Model
const FormData = require('./models/formDataModel'); // Form Data Model
const ComplainData = require('./models/cropLossModel');

const app = express();

// Middleware
app.use(cors()); // Enable CORS to allow frontend requests
app.use(bodyParser.json()); // Parses JSON requests (equivalent to express.json())
app.use(express.json()); // Ensure JSON parsing is enabled (redundant with bodyParser, but kept for clarity)

// Connect to MongoDB
connectDB()
    .then(() => console.log("✅ MongoDB Connected Successfully"))
    .catch((err) => {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1); // Exit process if DB connection fails
    });

// Initialize Razorpay with your API keys
const razorpay = new Razorpay({
    key_id: "rzp_test_Y6001oiMAxB4vr", // Replace with your Razorpay key_id
    key_secret: "MaPjnSuThRYUVsbYNEbZp1Yy", // Replace with your Razorpay key_secret
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

// Route to save the form data of Crop Loss
app.post("/api/complain", async (req, res) => {
    try {
        const complaint = new ComplainData(req.body);
        await complaint.save();
        res.status(200).json({ message: "Complaint submitted successfully!", complaint });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// New endpoint to create Razorpay order
app.post("/api/create-order", async (req, res) => {
    const { amount } = req.body; // Amount in INR (sent from frontend)

    try {
        const options = {
            amount: amount * 100, // Amount in paise (Razorpay expects amount in smallest currency unit)
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);
        res.json({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            key: "YOUR_RAZORPAY_KEY_ID", // Send key_id to frontend
        });
    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        res.status(500).json({ error: "Failed to create order" });
    }
});

// Optional: Verify payment (after payment is completed)
app.post("/api/verify-payment", (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const generatedSignature = crypto
        .createHmac("sha256", "YOUR_RAZORPAY_KEY_SECRET")
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

    if (generatedSignature === razorpay_signature) {
        res.status(200).json({ status: "success", message: "Payment verified" });
    } else {
        res.status(400).json({ status: "failure", message: "Payment verification failed" });
    }
});
app.use(cors()); // Allow requests from frontend

const uri = "mongodb+srv://souravmishra7456:wZgCzCsJJQ22Bnc8@cluster0.5j0ia.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

async function fetchFormDatas() {
    try {
        await client.connect();
        const db = client.db(); 
        const collection = db.collection("complaints");
        return await collection.find({}).toArray();
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}

app.get("/api/complaints", async (req, res) => {
    const data = await fetchFormDatas();
    res.json(data);
});


// Error Handler Middleware
app.use((err, req, res, next) => {
    console.error("Server Error:", err.stack);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

app.put("/api/complaints/:id/status", async (req, res) => {
    const { status } = req.body;

    if (!["Pending", "Approved", "Rejected"].includes(status)) {
        return res.status(400).json({ message: "Invalid status " });
    }

    try {
        const updatedComplaint = await ComplainData.findByIdAndUpdate(
            req.params.id,
            { $set: { status } },
            { new: true }
        );

        if (!updatedComplaint) {
            return res.status(404).json({ message: "Complaint not found" });
        }

        console.log("✅ Complaint updated successfully:", updatedComplaint);
        res.json({ message: "Status updated successfully", complaint: updatedComplaint });
    } catch (error) {
        console.error("❌ Error updating status:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});
 

// Export the app object (if needed for testing or modular use)
module.exports = app;