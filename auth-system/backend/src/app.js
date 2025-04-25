// src/app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { MongoClient } = require('mongodb');
const twilio = require("twilio");
require("dotenv").config();

const connectDB = require('./config/dbConfig');
const authRoutes = require('./routes/authRoutes');
const User = require('./models/userModel');
const FormData = require('./models/formDataModel');
const ComplainData = require('./models/cropLossModel');
const TextData = require('./models/textDataModel');
const axios = require('axios'); 
const Razorpay = require('razorpay'); 

const app = express();
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

app.post("/send-sms", async (req, res) => {
    const { to, message } = req.body;

    try {
        const sms = await twilioClient.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: to,
        });

        res.status(200).json({ success: true, data: sms });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Connect to MongoDB
connectDB()
    .then(() => console.log("✅ MongoDB Connected Successfully"))
    .catch((err) => {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1);
    });

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || '<YOUR_RAZORPAY_KEY_ID>',
    key_secret: process.env.RAZORPAY_KEY_SECRET || '<YOUR_RAZORPAY_KEY_SECRET>',
});

app.post("/api/verify-payment", (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");
  
    if (expectedSignature === razorpay_signature) {
      res.json({ status: "success" });
    } else {
      res.json({ status: "failure" });
    }
  });

  app.post('/api/create-order', async (req, res) => {
    try {
      const { amount } = req.body;
      const options = {
        amount: amount * 100*0.001,
        currency: "INR",
        receipt: "receipt_order_" + Date.now(),
      };
  
      const order = await razorpay.orders.create(options);
  
      res.status(200).json({
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        key: process.env.RAZORPAY_KEY_ID,
      });
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      res.status(500).json({ message: "Error creating Razorpay order", error: error.message });
    }
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
        console.error("Error saving complaint:", error);
        res.status(400).json({ error: error.message });
    }
});

app.get("/api/complain", async (req, res) => {
    try {
        const { aadhaar } = req.query;

        if (!aadhaar) {
            return res.status(400).json({ message: "Aadhaar number is required" });
        }

        const complaints = await ComplainData.find({ aadhaar });

        if (!complaints || complaints.length === 0) {
            return res.status(404).json({ message: "No complaints found for this Aadhaar number." });
        }

        res.status(200).json(complaints);
    } catch (error) {
        console.error("Error fetching complaints:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/api/complain/status", async (req, res) => {
    try {
        const { id } = req.query;

        // Validate the ID
        if (!id) {
            return res.status(400).json({ message: "Complaint ID is required" });
        }

        // Find complaint by _id
        const complaint = await ComplainData.findById(id);

        if (!complaint) {
            return res.status(404).json({ message: "Complaint not found" });
        }

        // Return only the status and complaint ID
        res.status(200).json({ 
            status: complaint.status,
            complaintId: complaint._id,
            phone:complaint.phone,
            name: complaint.name,
            state: complaint.state
        });
    } catch (error) {
        console.error("Error fetching complaint status:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


app.post('/api/translate', async (req, res) => {
    try {
        const { en, langCode } = req.body;

        // Validation
        if (!en || typeof en !== 'string') {
            return res.status(400).json({ message: "❌ English text (en) is required and must be a string" });
        }
        if (!langCode || typeof langCode !== 'string') {
            return res.status(400).json({ message: "❌ Language code (langCode) is required and must be a string" });
        }

        // Supported language codes
        const validLangCodes = ['en', 'hi', 'as', 'bn', 'gu', 'kn', 'ml', 'mr', 'or', 'pa', 'ta', 'te'];
        if (!validLangCodes.includes(langCode)) {
            return res.status(400).json({ message: "❌ Invalid language code. Supported codes: " + validLangCodes.join(', ') });
        }

        const textData = await TextData.findOne({ en });
        
        if (!textData) {
            return res.status(404).json({ message: "❌ Text not found in database" });
        }

        // Get the translation for the specified language code, fallback to English if not available
        const translation = textData[langCode] || textData.en;

        res.status(200).json({
            message: "✅ Translation fetched successfully",
            en: textData.en,
            langCode,
            translation,
            _id: textData._id,
            timestamp: textData.timestamp
        });
    } catch (error) {
        console.error("Error translating text:", error);
        res.status(500).json({ 
            message: "❌ Error translating text", 
            error: error.message 
        });
    }
});
 

// Save Text Data with Translations
app.post('/api/save-text', async (req, res) => {
    try {
        const { originalText, timestamp } = req.body;

        // Validation
        if (typeof originalText !== 'string') {
            return res.status(400).json({ message: "❌ originalText must be a string" });
        }
        if (!originalText) {
            return res.status(400).json({ message: "❌ Text cannot be empty" });
        }

        const srcLang = 'en';
        const targetLanguages = ['en', 'hi', 'as', 'bn', 'gu', 'kn', 'ml', 'mr', 'or', 'pa', 'ta', 'te'];

        // Check if the text already exists
        const existingText = await TextData.findOne({ en: originalText });
        if (existingText) {
            const response = {
                message: 'Text already exists',
                id: existingText._id,
                en: existingText.en,
                timestamp: existingText.timestamp
            };
            targetLanguages.forEach(lang => {
                if (existingText[lang]) response[lang] = existingText[lang];
            });
            return res.status(200).json(response);
        }

        const reverieApiUrl = 'https://revapi.reverieinc.com/';
        const apiKey = '<YOUR API-KEY>'; // Replace with your actual API key
        const appId = '<YOUR APP-ID>';   // Replace with your actual App ID

        let textDataPayload = {
            en: originalText,
            timestamp: timestamp || new Date().toISOString()
        };

        // Loop through target languages
        for (const tgtLang of targetLanguages) {
            if (tgtLang === 'en') continue;

            try {
                const response = await axios.post(reverieApiUrl, {
                    data: [originalText],
                    nmtMask: true,
                    nmtMaskTerms: {},
                    enableNmt: true,
                    enableLookup: true
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'REV-API-KEY': apiKey,
                        'REV-APP-ID': appId,
                        'src_lang': srcLang,
                        'tgt_lang': tgtLang,
                        'domain': 'generic',
                        'REV-APPNAME': 'localization',
                        'REV-APPVERSION': '3.0'
                    }
                });

                // Extract the translated text from responseList[0].outString
                const translatedText = response.data.responseList[0].outString;
                textDataPayload[tgtLang] = translatedText;
            } catch (translationError) {
                console.error(`Translation to ${tgtLang} failed:`, translationError.response?.data || translationError.message);
                textDataPayload[tgtLang] = originalText.split('').reverse().join(''); // Fallback
            }
        }

        // Save the text data
        const textData = new TextData(textDataPayload);
        await textData.save();

        const response = {
            message: 'Text saved successfully with translations',
            id: textData._id,
            en: textData.en,
            timestamp: textData.timestamp
        };
        targetLanguages.forEach(lang => {
            if (textData[lang]) response[lang] = textData[lang];
        });

        res.status(201).json(response);

    } catch (error) {
        console.error("Error saving text data:", error);
        res.status(500).json({ message: "❌ Error saving text data", error: error.message });
    }
});

// Endpoint to fetch all stored text
app.get('/api/texts', async (req, res) => {
    try {
        const texts = await TextData.find({});
        res.status(200).json(texts);
    } catch (error) {
        console.error("Error fetching texts:", error);
        res.status(500).json({ 
            message: "❌ Error fetching texts", 
            error: error.message 
        });
    }
});

// MongoDB Atlas connection for formdatas (separate client, optional)
const uri = "mongodb+srv://souravmishra7456:wZgCzCsJJQ22Bnc8@cluster0.5j0ia.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

async function fetchFormDatas() {
    try {
        await client.connect();
        const db = client.db(); // Uses default database from URI
        const collection = db.collection("complaints");
        return await collection.find({}).toArray();
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    } finally {
        await client.close();
    }
}

app.get("/api/complaints", async (req, res) => {
    const data = await fetchFormDatas();
    res.json(data);
});

app.put("/api/complaints/:id/status", async (req, res) => {
    const { status } = req.body;

    // Ensure status is valid
    if (!["Pending", "Approved", "Rejected", "In Review"].includes(status)) { // Add "In Review"
        return res.status(400).json({ message: "❌ Invalid status provided" });
    }

    try {
        const updatedComplaint = await ComplainData.findById(req.params.id);
        if (!updatedComplaint) {
            return res.status(404).json({ message: "❌ Complaint not found" });
        }

        // Update only if status has changed
        if (updatedComplaint.status !== status) {
            updatedComplaint.status = status;
            await updatedComplaint.save();
        }

        res.json({ message: "✅ Status updated successfully", complaint: updatedComplaint });
    } catch (error) {
        console.error("❌ Error updating status:", error);
        res.status(500).json({ message: "❌ Server error", error: error.message });
    }
});


// Error Handler Middleware
app.use((err, req, res, next) => {
    console.error("Server Error:", err.stack);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

 
module.exports = app;