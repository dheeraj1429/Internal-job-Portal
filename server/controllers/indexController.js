const { catchAsync } = require('../helpers/helper');
const jobPostModel = require('../model/schema/jobSchema');
const { httpStatusCodes } = require('../helpers/helper');
const authModel = require('../model/schema/authSchema');
const jwt = require('jsonwebtoken');
const sharp = require('sharp');
const path = require('path');
const SECRET_KEY = process.env.SECRET_KEY;

const getAllJobPosts = catchAsync(async function (req, res, next) {
   const allJobs = await jobPostModel.find({}, { metaData: 0 });
   const documentCount = await jobPostModel.countDocuments();
   if (allJobs) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         allJobs,
         documents: documentCount,
      });
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         success: false,
         message: 'Internal server error',
      });
   }
});

const getSingleJobPostDetail = catchAsync(async function (req, res, next) {
   const { id } = req.params;
   const singleJobPost = await jobPostModel.findOne({ _id: id });
   if (singleJobPost) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         post: singleJobPost,
      });
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         success: false,
         message: 'Internal server error',
      });
   }
});

const sendUserContactRespone = async function (updateUserContact, res, _id, updateObject, token) {
   if (!!updateUserContact.modifiedCount) {
      const userInfo = await authModel.findOne({ _id });

      const userObject = {
         name: updateObject.name,
         email: userInfo.email,
         profilePic: userInfo.userProfile,
         role: userInfo.role,
         token,
      };

      // set the user updated value into the cookie
      res.cookie('user', userObject);

      return res.status(httpStatusCodes.CREATED).json({
         success: true,
         message: 'User information updated',
         updatedData: {
            name: updateObject.name,
            profilePic: userInfo.userProfile,
         },
      });
   } else {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         message: 'User information already updated',
      });
   }
};

const saveUserContactInfo = catchAsync(async function (req, res, next) {
   const { token } = req.body;

   // varify the user
   const varifyToken = await jwt.verify(token, SECRET_KEY);
   const { _id } = varifyToken;
   const updateObject = { ...req.body };
   delete updateObject.token;

   if (req?.files.length) {
      const file = req.files[0];
      const originalname = file.originalname;
      const imagePath = file.path;
      await sharp(imagePath)
         .resize({
            width: 100,
            height: 100,
         })
         .toFile(path.join(__dirname, '..', 'upload', 'usersProfileCompress', originalname));

      updateObject.userProfile = originalname;

      const updateUserContact = await authModel.updateOne({ _id }, { $set: updateObject });
      sendUserContactRespone(updateUserContact, res, _id, updateObject, token);
   } else {
      const updateUserContact = await authModel.updateOne({ _id }, { $set: updateObject });
      sendUserContactRespone(updateUserContact, res, _id, updateObject, token);
   }
});

const getUserContactInfo = catchAsync(async function (req, res, next) {
   const { token } = req.params;
   const varifyToken = await jwt.verify(token, SECRET_KEY);
   const { _id } = varifyToken;
   const findUserInfo = await authModel.findOne(
      { _id },
      { password: 0, role: 0, createdAt: 0, tokens: 0 }
   );

   if (findUserInfo) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         info: findUserInfo,
      });
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         success: false,
         message: 'Internal server error',
      });
   }
});

const saveUserResumeInformation = catchAsync(async function (req, res, next) {
   // check which user is post the data
   const { token } = req.body;
   // varify the user
   const varifyToken = await jwt.verify(token, SECRET_KEY);
   const { _id } = varifyToken;

   // create a shallow copy of the req.body object values.
   const userPostedData = Object.assign(req.body);
   delete userPostedData.token;

   // parse the json object
   userPostedData.skills = JSON.parse(userPostedData.skills);

   const updateUserInfo = await authModel.updateOne({ _id }, { $set: userPostedData });

   if (!!updateUserInfo.modifiedCount) {
      return res.status(httpStatusCodes.CREATED).json({
         success: true,
         message: 'Information saved',
      });
   } else {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         message: 'information is already saved',
      });
   }
});

const fetchUserResumeInformation = catchAsync(async function (req, res, next) {
   const { token } = req.params;
   // varify the user
   const varifyToken = await jwt.verify(token, SECRET_KEY);
   const { _id } = varifyToken;

   const findUserDetails = await authModel.findOne(
      { _id },
      {
         headline: 1,
         objective: 1,
         year: 1,
         month: 1,
         date: 1,
         eligibility: 1,
         industry: 1,
         experience: 1,
         careerLevel: 1,
         skills: 1,
      }
   );

   if (findUserDetails) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         info: findUserDetails,
      });
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         success: false,
         message: 'Internal server error',
      });
   }
});

module.exports = {
   getAllJobPosts,
   getSingleJobPostDetail,
   saveUserContactInfo,
   getUserContactInfo,
   saveUserResumeInformation,
   fetchUserResumeInformation,
};
