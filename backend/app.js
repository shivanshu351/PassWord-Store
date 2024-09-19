// Importing the express module
const express = require("express");

// Importing the mongoose module for MongoDB interaction
const mongoose = require("mongoose");

// Importing the cors module to enable Cross-Origin Resource Sharing
const cors = require('cors');

// Loading environment variables from a .env file into process.env
require('dotenv').config()

// Getting the MongoDB URI from environment variables
const MONGODB_URI = process.env.DATABASE_URL;

// Creating an instance of the express application
const app = express();

// Middleware to parse JSON bodies of incoming requests
app.use(express.json());

// Middleware to enable CORS
app.use(cors());

// Importing routes for password manager functionality
const pwMangerRountes = require("./routes/route.js");

// Using the imported routes for requests to /api/passwords
app.use("/api/passwords", pwMangerRountes)

// Connecting to MongoDB using the MONGODB_URI
mongoose.connect(MONGODB_URI)
.then(result => {
    // Starting the server on port 3000 upon successful MongoDB connection
    app.listen(3000, () => {
        console.log("listening to port 3000");
    });
})
.catch(err => {
    // Logging any errors that occur during the MongoDB connection
    console.log(err);
})
