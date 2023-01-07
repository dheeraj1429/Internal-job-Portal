const express = require("express");
const route = express.Router();
const indexController = require("../controllers/indexController");
const { checkIsUserValid, upload } = require("../helpers/helper");

// API => GET
route.get("/get-all-job-posts", indexController.getAllJobPosts);
route.get("/get-single-post-info/:id", indexController.getSingleJobPostDetail);
route.get("/get-user-contact-info/:token", checkIsUserValid, indexController.getUserContactInfo);
route.get(
   "/get-user-resume-information/:token",
   checkIsUserValid,
   indexController.fetchUserResumeInformation
);
route.get(
   "/get-user-resume-content/:token",
   checkIsUserValid,
   indexController.fetchUserResumeContactInformation
);
route.get(
   "/get-user-includes-groups-info/:token",
   checkIsUserValid,
   indexController.getUserIncludeGroups
);
route.get("/get-group-chats/:token", checkIsUserValid, indexController.fetchGroupChats);
route.get("/get-pinned-projects/:token", checkIsUserValid, indexController.findPinnedProjects);
route.get("/get-group-lists/:token", checkIsUserValid, indexController.getGroupLists);

// API => POST
route.post(
   "/save-user-contact-info/:token",
   checkIsUserValid,
   upload,
   indexController.saveUserContactInfo
);
route.post(
   "/save-user-resume-information/:token",
   checkIsUserValid,
   upload,
   indexController.saveUserResumeInformation
);
route.post(
   "/submit-user-information/:token",
   checkIsUserValid,
   upload,
   indexController.jobSubmition
);

module.exports = route;
