const express = require('express');
const route = express.Router();
const indexController = require('../controllers/indexController');
const { checkIsUserValid } = require('../helpers/helper');
const multer = require('multer');

const storage = multer.diskStorage({
   destination: function (req, file, callback) {
      if (
         file.mimetype === 'image/png' ||
         file.mimetype === 'image/jpeg' ||
         file.mimetype === 'image/jpg'
      ) {
         callback(null, './upload/usersProfile');
      }

      if (file.mimetype === 'application/pdf') {
         callback(null, `./upload/userResume`);
      }
   },
   filename: function (req, file, callback) {
      callback(null, file.originalname);
   },
});

const upload = multer({ storage: storage }).any();

// API => GET
route.get('/get-all-job-posts', indexController.getAllJobPosts);
route.get('/get-single-post-info/:id', indexController.getSingleJobPostDetail);
route.get('/get-user-contact-info/:token', checkIsUserValid, indexController.getUserContactInfo);
route.get(
   '/get-user-resume-information/:token',
   checkIsUserValid,
   indexController.fetchUserResumeInformation
);
route.get(
   '/get-user-resume-content/:token',
   checkIsUserValid,
   indexController.fetchUserResumeContactInformation
);

// API => POST
route.post(
   '/save-user-contact-info/:token',
   checkIsUserValid,
   upload,
   indexController.saveUserContactInfo
);
route.post(
   '/save-user-resume-information/:token',
   checkIsUserValid,
   upload,
   indexController.saveUserResumeInformation
);
route.post('/submit-user-information/:token', checkIsUserValid, indexController.jobSubmition);

module.exports = route;
