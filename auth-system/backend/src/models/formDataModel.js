const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema({
    aadhar: String,
    name: String,
    district: String,
    pincode: String,
    account: String,
    branch: String,
    ifsc: String,
    mobile: String,
    crop: String,
    dateOfSowing: String,
    areaSown: String,
    season: String
});

const FormData = mongoose.model('FormData', formDataSchema);

module.exports = FormData;
