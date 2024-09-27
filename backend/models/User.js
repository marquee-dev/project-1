const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

// Use `mongoose.models` to check if the model already exists
const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = User;
