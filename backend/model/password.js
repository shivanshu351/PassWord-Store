// Importing the mongoose module
const mongoose = require("mongoose");

// Creating a schema constructor from mongoose
const Schema = mongoose.Schema;

// Defining the password schema with fields and their types and requirements
const passwordSchema = new Schema({
    userName: {
        type: String,
        required: true // userName is required and must be a string
    },

    password: {
        type: String,
        required: true // password is required and must be a string
    },

    websiteLink: {
        type: String,
        required: false // websiteLink is not required and must be a string if provided
    },

    websiteName: {
        type: String,
        required: true // websiteName is required and must be a string
    }
});

// Exporting the Password model created from the passwordSchema
module.exports = mongoose.model("Password", passwordSchema);
