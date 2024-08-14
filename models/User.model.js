const mongoose = require('mongoose');
const ConnectionMongodb = require('../helps/connection_mongodb');
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }

})
module.exports = ConnectionMongodb().model("User", UserSchema);