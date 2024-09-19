// Importing the express module
const express = require("express");

// Importing the controller module for handling routes logic
const controller = require("../controller/controller.js");

// Creating a router object using express
const router = express.Router();

// Defining a GET route to fetch passwords, handled by the getPasswords method in the controller
router.get("/", controller.getPasswords);

// Defining a POST route to create new passwords, handled by the createPasswords method in the controller
router.post("/", controller.createPasswords);

// Defining a DELETE route to delete a password by id, handled by the deletePasswords method in the controller
router.delete("/:id", controller.deletePasswords);

// Defining a PATCH route to update a password by id, handled by the updatePassword method in the controller
router.patch("/:id", controller.updatePassword);

// Exporting the router object to be used in other parts of the application
module.exports = router;
