const { catchAsync } = require('../helpers/helper');
const jobPostModel = require('../model/schema/jobSchema');
const { httpStatusCodes } = require('../helpers/helper');
const authModel = require('../model/schema/authSchema');
const jwt = require('jsonwebtoken');
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

const saveUserContactInfo = catchAsync(async function (req, res, next) {
   const { token } = req.body;

   const varifyToken = await jwt.verify(token, SECRET_KEY);
   const { _id } = varifyToken;

   const updateObject = { ...req.body };
   delete updateObject.token;

   const updateUserContact = await authModel.updateOne({ _id }, { $set: updateObject });
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
      });
   } else {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         message: 'User information already updated',
      });
   }
});

const getUserContactInfo = catchAsync(async function (req, res, next) {
   const { token } = req.params;
   const varifyToken = await jwt.verify(token, SECRET_KEY);
   const { _id } = varifyToken;
   const findUserInfo = await authModel.findOne(
      { _id },
      { name: 1, cityState: 1, phone: 1, postalCode: 1, street: 1, showNumber: 1 }
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

module.exports = {
   getAllJobPosts,
   getSingleJobPostDetail,
   saveUserContactInfo,
   getUserContactInfo,
};
