const express = require("express");
const route = express.Router();
const authController = require("../controllers/authController");

// API => GET
route.get("/login-user", authController.userLogin);
route.get("/forget-password", authController.forgetPassword);

// API => POST
route.post("/signin-user", authController.userSignIn);

// API => PATCH
route.patch("/forget-user-change-password", authController.changeUserPassword);

module.exports = route;
