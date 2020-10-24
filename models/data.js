/**
 * @author  Michael Grigoryan
 * @version 1.0.0
 */
const mongoose = require("mongoose");
const dataSchema = new mongoose.Schema({
    "latitude": Number,
    "longitude": Number,
    "latlng": String
});

module.exports = mongoose.model("data", dataSchema);
