const express = require('express');
const route = express.Router();
const User = require('../models/User.model');
const createError = require('http-errors');
const {userValidation} = require('../helps/validation');

route.post('/register', async (req, res, next) => {
    try {
        const {email, password} = req.body ;
        const {error} = userValidation(req.body);
        if(error) {
            console.log("Error::", error);
            throw createError.BadRequest(error.details[0].message);
        } 
        const isExit = await User.findOne({username: email});
        if(isExit) {
            throw createError.Conflict("Email is conflict");
        }
        const user = new User({
            username: email,
            password: password
        })
        const savedUser = await user.save();

        // const user = await User.create({
        //     username: email,
        //     password: password
        // })
        
        return res.json({
            status: 200,
            message: "Register success",
            element: savedUser
        })
    }catch (err) {
        next(err);
    }
})
route.post('/login', async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const {error} = userValidation(req.body);
        if(error) {
            throw createError.BadRequest(error.details[0].message);
        }

        const user = await User.findOne({
            username:email
        });
        if(!user) {
            throw createError.NotFound("User not found");
        }

        const isValid = await user.isCheckPassword(password);
        if(!isValid) {
            throw createError.Unauthorized("Password is failed");
        }
        res.json({
            status: 200,
            message: "Login success",
            element:user
        });
    } catch (error) {
        next(error);
    }
   
})
route.post('/logout', (req, res, next) => {
    res.send('function logout');
})
route.post('/refresh-token', (req, res, next) => {
    res.send('function refresh-token');
})

module.exports = route;