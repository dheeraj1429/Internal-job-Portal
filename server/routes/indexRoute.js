const express = require('express');
const route = express.Router();
const indexController = require('../controllers/indexController');
const { checkIsUserValid } = require('../helpers/helper');

// API => GET
route.get('/get-all-job-posts', indexController.getAllJobPosts);
route.get('/get-single-post-info/:id', indexController.getSingleJobPostDetail);
route.get('/get-user-contact-info/:token', checkIsUserValid, indexController.getUserContactInfo);

// API => POST
route.post('/save-user-contact-info/:token', checkIsUserValid, indexController.saveUserContactInfo);

module.exports = route;
