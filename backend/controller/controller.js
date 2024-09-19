// Importing the Password model
const Password = require("../model/password")

// Function to handle GET requests to fetch all passwords
exports.getPasswords = (req, res, next) => {
    Password
    .find()
    .then(passwords => {
        // Sending the fetched passwords with a 200 status code
        res.status(200).json(passwords);
    })
    .catch(error => {
        // Sending an error response with a 500 status code if fetching fails
        res.status(500).json(error);
    })
}

// Function to handle POST requests to create a new password
exports.createPasswords = (req, res, next) => {
    // Creating a new Password object with data from the request body
    const newPassword = new Password({
        userName: req.body.userName,
        password: req.body.password,
        websiteLink: req.body.websiteLink || null,
        websiteName: req.body.websiteName,
    })
    newPassword
    .save()
    .then(savedPassword => {
        // Sending the saved password with a 201 status code
        res.status(201).json(savedPassword);
    })
    .catch(error => {
        // Sending an error response with a 500 status code if saving fails
        res.status(500).json(error);
    })
}

// Function to handle DELETE requests to delete a password by ID
exports.deletePasswords = (req, res, next) => {
    const id = req.params.id;
    Password
    .deleteOne({_id : id})
    .then(result => {
        if(!result){
            // Sending a 404 status code if the password is not found
            return res.status(404).json({"error": "User not found"})
        }
        // Sending a success message with a 200 status code if deletion is successful
        res.status(200).json({"message": "Password deleted successfully"});
    })
    .catch(error => {
        // Sending an error response with a 500 status code if deletion fails
        res.status(500).json({ error: "Failed to delete password" });
    })
}

// Function to handle PATCH requests to update a password by ID
exports.updatePassword = (req, res, next) => {
    const id = req.params.id;
    Password
    .findById(id)
    .then(result => {
        if(!result){
            // Sending a 404 status code if the password is not found
            return res.status(404).json({"error": "User not found"})
        }
        // Updating the password fields with data from the request body
        result.userName = req.body.userName || result.userName;
        result.password = req.body.password || result.password;
        result.websiteLink = req.body.websiteLink || result.websiteLink;
        result.websiteName = req.body.websiteName || result.websiteName;

        // Saving the updated password
        return result.save();
    })
    .then(updatedPassword => {
        // Sending the updated password with a 200 status code
        res.status(200).json(updatedPassword);
    })
    .catch(error => {
        // Sending an error response with a 500 status code if updating fails
        res.status(500).json(error);
    })
}
