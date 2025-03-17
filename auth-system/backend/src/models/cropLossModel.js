const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
    name: { type: String, required: true },
    claimType: { type: String, required: true },
    farmerType: { type: String, required: true },
    amount: { type: Number, required: true, min: 1 },
    phone: { type: String, required: true, match: /^\d{10}$/ },
    state: { type: String, required: true },
    district: { type: String, required: true },
    bankName: { type: String, required: true },
    bankBranch: { type: String, required: true },
    accountNumber: { type: String, required: true, match: /^\d{9,18}$/ },
    address: { type: String, required: true, minlength: 5 },
    pincode: { type: String, required: true, match: /^\d{6}$/ },
    areaImpacted: { type: Number, required: true, min: 1 },
    causeOfLoss: { type: String, required: true },
    aadhaar: { type: String, required: true, match: /^\d{12}$/ },
    dateOfSowing: { type: String, required: true },
    status: { type: String, default: "Pending", enum: ["Pending", "Approved", "Rejected"] },
    createdAt: { type: Date, default: Date.now }
});

const Complaint = mongoose.model("Complaint", complaintSchema);

module.exports = Complaint;
