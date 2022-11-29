const express = require('express');
const route = express.Router();
const adminController = require('../controllers/adminController');
const { checkIsUserValid } = require('../helpers/helper');

// API => GET
route.get(
   '/get-single-job-post-info/:token',
   checkIsUserValid,
   adminController.getSingleJobPostDetails
);
route.get(
   '/get-all-job-application/:token',
   checkIsUserValid,
   adminController.getAllJobApplications
);
route.get(
   '/get-single-job-application/:token',
   checkIsUserValid,
   adminController.getSingleJobAplpication
);
route.get('/downloadUserResume/:token', checkIsUserValid, adminController.downloadUserResume);

// API => POST
route.post('/inert-new-job-post/:token', checkIsUserValid, adminController.postNewjob);

// API => PATCH
route.patch('/update-job-post/:token', checkIsUserValid, adminController.updateJobPost);

// API => DELET
route.delete('/delete-single-post/:token', checkIsUserValid, adminController.deleteSingleJobPost);

module.exports = route;
