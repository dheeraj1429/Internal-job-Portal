const authModel = require("../model/schema/authSchema");
const { catchAsync, httpStatusCodes } = require("../helpers/helper");
const bcryptjs = require("bcryptjs");
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

const userSignIn = catchAsync(async function (req, res, next) {
   const { name, email, password } = req.body;

   // find the email is exits in database or not.
   const findUserEmail = await authModel.findOne({ email });
   if (findUserEmail) {
      return res.status(httpStatusCodes.OK).json({
         success: false,
         message: "email is already used",
      });
   } else {
      const newUserSignIn = await authModel({
         name,
         email,
         password,
      });

      const saveUser = await newUserSignIn.save();
      const token = await saveUser.genrateUserToken();

      const userObject = {
         name,
         email,
         profilePic: saveUser.userProfile,
         role: saveUser.role,
         _id: saveUser._id,
         token,
      };

      res.cookie("_ijp_at_user", userObject);

      return res.status(httpStatusCodes.CREATED).json({
         success: true,
         message: "User account created",
         userObject,
      });
   }
});

const userLogin = catchAsync(async function (req, res, next) {
   const { email, password } = req.query;
   // check the email is match
   const findUserAccount = await authModel.findOne({ email });
   if (!findUserAccount) {
      return res.status(httpStatusCodes.OK).json({
         success: false,
         message: "No account find",
      });
   }

   // varify the user password is match or not.
   const varifyPassword = await bcryptjs.compare(password, findUserAccount.password);

   if (!varifyPassword) {
      return res.status(httpStatusCodes.OK).json({
         success: false,
         message: "Account password is not match",
      });
   }

   // genrate the user new token.
   const token = await findUserAccount.genrateUserToken();

   const userObject = {
      name: findUserAccount.name,
      email: findUserAccount.email,
      profilePic: findUserAccount.userProfile,
      role: findUserAccount.role,
      _id: findUserAccount._id,
      token,
   };

   // set the user into the browser cookie
   res.cookie("_ijp_at_user", userObject);

   return res.status(httpStatusCodes.OK).json({
      success: true,
      userObject,
   });
});

const forgetPassword = catchAsync(async function (req, res, next) {
   const { email } = req.query;

   // check the email is exists or not
   const findEmail = await authModel.findOne({ email });

   if (!findEmail) {
      return res.status(httpStatusCodes.OK).json({
         success: false,
         message: "No email address found",
      });
   }

   // forget password template path
   const filePath = path.join(__dirname, "..", "views", "templates", "forgetPassword.ejs");

   ejs.renderFile(filePath, (err, data) => {
      if (err) {
         console.log(err);
      }
      const output = data.replace(
         `<a>testing-content</a>`,
         `<a class="large expand" href="http://localhost:3000/portal/password-forget/${findEmail._id}"
      style="font-family:Lato,sans-serif;height:50px;left:50%;margin:20px -100px;position:relative;top:50%;width:200px">RESET
      PASSWORD</a>`
      );

      const mail = nodemailer.createTransport({
         service: "gmail",
         auth: {
            user: process.env.EMAIL,
            pass: process.env.APPPASSWORD,
         },
      });

      mail.sendMail(
         {
            from: process.env.EMAIL,
            to: email,
            subject: "forget password request",
            html: output,
         },
         function (err, info) {
            if (err) {
               console.log(err);
            }

            // set access cookie
            res.cookie("_jp_froget_pwd_rq", true, { maxAge: 50000 });
            res.cookie("_jp_froget_pwd_rq_access", true, { maxAge: 90000 });

            return res.status(httpStatusCodes.OK).json({
               success: true,
               message: "Please check your email",
            });
         }
      );
   });
});

const changeUserPassword = catchAsync(async function (req, res, next) {
   const { password, userId } = req.body;
   // check the user password reset cookie is expire or not.

   // check the preview password is same or not.
   const checkPrevPwd = await authModel.findOne({ _id: userId });
   const checkPassword = await bcryptjs.compare(password, checkPrevPwd.password);

   if (checkPassword) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         message: "Old password and new password are same!",
      });
   } else {
      // hash user password
      const hashPassword = await bcryptjs.hash(password, 11);

      // update the user information
      const updateUser = await authModel.updateOne(
         { _id: userId },
         { $set: { password: hashPassword } }
      );

      if (!!updateUser.modifiedCount) {
         return res.status(httpStatusCodes.OK).json({
            success: true,
            message: "Password changed",
         });
      } else {
         return res.status(httpStatusCodes.INTERNAL_SERVER).json({
            success: false,
            message: "Internal server error",
         });
      }
   }
});

module.exports = {
   userSignIn,
   userLogin,
   forgetPassword,
   changeUserPassword,
};
