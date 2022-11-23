const express = require('express');
const route = express.Router();
const indexController = require('../controllers/indexController');

// API => GET
route.get('/get-all-job-posts', indexController.getAllJobPosts);

module.exports = route;
