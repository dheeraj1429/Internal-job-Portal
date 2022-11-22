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

// API => POST
route.post('/inert-new-job-post/:token', checkIsUserValid, adminController.postNewjob);

module.exports = route;
