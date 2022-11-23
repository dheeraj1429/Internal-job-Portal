const express = require('express');
const route = express.Router();
const adminController = require('../controllers/adminController');

const checkIsUserValid = function (req, res, next) {
   const { token } = req.params;

   if (!token) {
      return res.status(200).json({
         success: false,
         message: 'invalid token',
      });
   } else {
      next();
   }
};

// API => GET
route.get(
   '/get-single-job-post-info/:token',
   checkIsUserValid,
   adminController.getSingleJobPostDetails
);

// API => POST
route.post('/inert-new-job-post/:token', checkIsUserValid, adminController.postNewjob);

// API => PATCH
route.patch('/update-job-post/:token', checkIsUserValid, adminController.updateJobPost);

// API => DELET
route.delete('/delete-single-post/:token', checkIsUserValid, adminController.deleteSingleJobPost);

module.exports = route;
