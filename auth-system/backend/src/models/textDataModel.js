// src/models/textDataModel.js
const mongoose = require('mongoose');

const textDataSchema = new mongoose.Schema({
    en: { // English text (original text will be stored here)
        type: String,
        required: true // Making it required since it will hold the original text
    },
    hi: { // Hindi translation
        type: String,
        required: false
    },
    as: { // Assamese
        type: String,
        required: false
    },
    bn: { // Bangla
        type: String,
        required: false
    },
    gu: { // Gujarati
        type: String,
        required: false
    },
    kn: { // Kannada
        type: String,
        required: false
    },
    ml: { // Malayalam
        type: String,
        required: false
    },
    mr: { // Marathi
        type: String,
        required: false
    },
    or: { // Odia
        type: String,
        required: false
    },
    pa: { // Punjabi
        type: String,
        required: false
    },
    ta: { // Tamil
        type: String,
        required: false
    },
    te: { // Telugu
        type: String,
        required: false
    },
    timestamp: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('TextData', textDataSchema);