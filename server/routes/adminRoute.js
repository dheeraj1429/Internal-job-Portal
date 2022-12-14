const express = require("express");
const route = express.Router();
const adminController = require("../controllers/adminController");
const { checkIsUserValid } = require("../helpers/helper");

// API => GET
route.get(
   "/get-single-job-post-info/:token",
   checkIsUserValid,
   adminController.getSingleJobPostDetails
);
route.get(
   "/get-all-job-application/:token",
   checkIsUserValid,
   adminController.getAllJobApplications
);
route.get(
   "/get-single-job-application/:token",
   checkIsUserValid,
   adminController.getSingleJobAplpication
);
route.get("/downloadUserResume/:token", checkIsUserValid, adminController.downloadUserResume);
route.get("/get-all-login-users/:token", checkIsUserValid, adminController.getAllLoginUsers);
route.get("/get-all-groups/:token", checkIsUserValid, adminController.getAllGroups);
route.get("/get-group-users-infomation/:token", checkIsUserValid, adminController.getGroupUserInfo);

// API => POST
route.post("/inert-new-job-post/:token", checkIsUserValid, adminController.postNewjob);

// API => PATCH
route.patch("/update-job-post/:token", checkIsUserValid, adminController.updateJobPost);
route.patch("/update-user-role/:token", checkIsUserValid, adminController.updateUserRole);

// API => DELETE
route.delete("/delete-single-post/:token", checkIsUserValid, adminController.deleteSingleJobPost);
route.delete("/delete-user-account/:token", checkIsUserValid, adminController.deleteUserAccount);

module.exports = route;
