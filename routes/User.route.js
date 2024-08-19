const express = require('express');
const route = express.Router();
const User = require('../models/User.model');
const createError = require('http-errors');
const {userValidation} = require('../helps/validation');

route.post('/register', async (req, res, next) => {
    try {

        const {email, password} = req.body;
        const {error} = userValidation(req.body);

        if (error) {
            throw createError(error.details[0].message);
        }
        if (!email || !password) {
            throw createError.BadRequest("tai khoan hoac mat khau trong");
        }
        const isExits = await User.findOne({username: email});
        if (isExits) {
            throw createError.Conflict("email bi trung");
        }
        const isCreate = await User.create({
            username: email,
            password
        });
        return res.json({
            status: "okey",
            elements: isCreate
        })
    } catch (error) {
        next(error);
    }
})
route.post('/login', (req, res, next) => {
    res.send('function login');
})
route.post('/logout', (req, res, next) => {
    res.send('function logout');
})
route.post('/refresh-token', (req, res, next) => {
    res.send('function refresh-token');
})

module.exports = route;