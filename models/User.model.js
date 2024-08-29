const mongoose = require('mongoose');
const ConnectionMongodb = require('../helps/connection_mongodb');
const bcrypt = require('bcrypt');
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

UserSchema.pre('save', async function(next) {
    try {
        console.log("Before save user :", this.username, this.password);
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(this.password, salt);
        this.password = hashPassword;
    } catch (error) {
        next(error);
    }
})
module.exports = ConnectionMongodb().model("User", UserSchema);