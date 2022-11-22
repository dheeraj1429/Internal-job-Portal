const express = require('express');
const route = express.Router();
const authController = require('../controllers/authController');

// API => GET
route.get('/login-user', authController.userLogin);

// API => POST
route.post('/signin-user', authController.userSignIn);

module.exports = route;
