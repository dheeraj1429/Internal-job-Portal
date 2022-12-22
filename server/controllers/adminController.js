const { catchAsync } = require("../helpers/helper");
const jobPostModel = require("../model/schema/jobSchema");
const { httpStatusCodes, fetchPaginationData } = require("../helpers/helper");
const jobAppliedModel = require("../model/schema/jobAppliedSchema");
const { default: mongoose } = require("mongoose");
const path = require("path");
const authModel = require("../model/schema/authSchema");
const groupModel = require("../model/schema/groupSchema");

const postNewjob = catchAsync(async function (req, res, next) {
   const insertedObject = { ...req.body };
   const updatePost = await jobPostModel(insertedObject).save();
   if (updatePost) {
      return res.status(httpStatusCodes.CREATED).json({
         success: true,
         message: "New job post uploded",
      });
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         success: false,
         message: "Internal server error",
      });
   }
});

const getSingleJobPostDetails = catchAsync(async function (req, res, next) {
   const { postId } = req.query;
   if (!postId) {
      throw new Error("job post id is required!");
   }

   const singlPost = await jobPostModel.findOne({ _id: postId }, { userApplied: 0 });

   if (singlPost) {
      return res.status(httpStatusCodes.CREATED).json({
         success: true,
         post: singlPost,
      });
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         success: false,
         message: "Post is not exits",
      });
   }
});

const updateJobPost = catchAsync(async function (req, res, next) {
   const { postId, jobTitle, salaryRangeStart, salaryRangeEnd, jobType, jobCategory, positionDescription, metaData } = req.body;

   if (!postId) {
      throw new Error("job post id is required!");
   }

   const updateJobPost = await jobPostModel.updateOne(
      { _id: postId },
      {
         $set: {
            jobTitle,
            salaryRangeStart,
            salaryRangeEnd,
            jobType,
            jobCategory,
            positionDescription,
            metaData,
         },
      }
   );

   if (!!updateJobPost.modifiedCount) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         message: "Post updated",
      });
   } else {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         message: "Post update already",
      });
   }
});

const deleteSingleJobPost = catchAsync(async function (req, res, next) {
   const { postId } = req.query;
   if (!postId) {
      throw new Error("job post id is required!");
   }
   const deleteSinglePost = await jobPostModel.deleteOne({ _id: postId });
   if (!!deleteSinglePost.deletedCount) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         message: "Job post deleted",
         deletePostId: postId,
      });
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         success: false,
         message: "internal serer error",
      });
   }
});

const getAllJobApplications = catchAsync(async function (req, res, next) {
   // pagination effect
   // const { page } = req.query;

   const jobResponse = await jobAppliedModel.aggregate([
      {
         $lookup: {
            from: "jobposts",
            localField: "jobId",
            foreignField: "_id",
            as: "jobApplied",
         },
      },
      {
         $lookup: {
            from: "auths",
            localField: "userId",
            foreignField: "_id",
            as: "user",
         },
      },
      {
         $project: {
            _id: 1,
            reference: 1,
            notes: 1,
            referenecResume: 1,
            jobApplied: { $arrayElemAt: ["$jobApplied", 0] },
            user: { $arrayElemAt: ["$user", 0] },
         },
      },
      {
         $project: {
            _id: 1,
            reference: 1,
            notes: 1,
            referenecResume: 1,
            "jobApplied._id": 1,
            "jobApplied.jobTitle": 1,
            "jobApplied.salaryRangeStart": 1,
            "jobApplied.salaryRangeEnd": 1,
            "user._id": 1,
            "user.name": 1,
            "user.email": 1,
            "user.userProfile": 1,
            "user.cityState": 1,
            "user.phone": 1,
            "user.postalCode": 1,
         },
      },
   ]);

   if (jobResponse) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         applications: jobResponse,
      });
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         success: false,
         message: "Internal server error",
      });
   }
});

const getSingleJobAplpication = catchAsync(async function (req, res, next) {
   const { jobId } = req.query;

   const SingleJobApplicationResponse = await jobAppliedModel.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(jobId) } },
      {
         $lookup: {
            from: "jobposts",
            localField: "jobId",
            foreignField: "_id",
            as: "jobApplied",
         },
      },
      {
         $lookup: {
            from: "auths",
            localField: "userId",
            foreignField: "_id",
            as: "user",
         },
      },
      {
         $project: {
            _id: 1,
            reference: 1,
            notes: 1,
            referenceResume: 1,
            candidateName: 1,
            candidateNumber: 1,
            jobApplied: { $arrayElemAt: ["$jobApplied", 0] },
            user: { $arrayElemAt: ["$user", 0] },
         },
      },
      {
         $project: {
            _id: 1,
            reference: 1,
            notes: 1,
            referenceResume: 1,
            candidateName: 1,
            candidateNumber: 1,
            "jobApplied._id": 1,
            "jobApplied.jobTitle": 1,
            "jobApplied.salaryRangeStart": 1,
            "jobApplied.salaryRangeEnd": 1,
            "jobApplied.jobType": 1,
            "jobApplied.jobCategory": 1,
            "user._id": 1,
            "user.name": 1,
            "user.email": 1,
            "user.userProfile": 1,
            "user.cityState": 1,
            "user.phone": 1,
            "user.postalCode": 1,
            "user.street": 1,
            "user.careerLevel": 1,
            "user.eligibility": 1,
            "user.experience": 1,
            "user.industry": 1,
            "user.skills": 1,
            "user.resume": 1,
         },
      },
   ]);

   if (SingleJobApplicationResponse) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         applications: SingleJobApplicationResponse,
      });
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         success: false,
         message: "Internal server error",
      });
   }
});

const downloadUserResume = catchAsync(async function (req, res, next) {
   const { resume } = req.query;
   const resumePata = path.join(__dirname, "..", "upload", "userResume", resume);
   res.download(resumePata);
});

const getAllLoginUsers = catchAsync(async function (req, res, next) {
   const { page } = req.query;

   const DOCUMENT_LIMIT = 5;

   fetchPaginationData(
      authModel,
      page,
      DOCUMENT_LIMIT,
      res,
      "users",
      { $and: [{ role: { $ne: "admin" } }, { role: { $ne: "subAdmin" } }] },
      { name: 1, email: 1, role: 1, userProfile: 1 }
   );
});

const updateUserRole = catchAsync(async function (req, res, next) {
   const { role, userId } = req.body;
   const updateUser = await authModel.updateOne(
      { _id: userId },
      {
         $set: {
            role,
         },
      }
   );

   if (!!updateUser.modifiedCount) {
      return res.status(httpStatusCodes.CREATED).json({
         success: true,
         message: "user role updated",
         userId,
         role,
      });
   } else {
      return res.status(httpStatusCodes.OK).json({
         success: false,
         message: "user role already updated",
         userId,
         role,
      });
   }
});

const deleteUserAccount = catchAsync(async function (req, res, next) {
   const { userId } = req.query;
   if (!userId) {
      throw new Error("user id is required!");
   }
   const deleteAccount = await authModel.deleteOne({ _id: userId });
   if (!!deleteAccount.deletedCount) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         message: "user account deleted",
         userId,
      });
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         success: false,
         message: "Internal server error",
      });
   }
});

const getAllGroups = catchAsync(async function (req, res, next) {
   const findAllGroupData = await groupModel.aggregate([
      {
         $project: {
            _id: 1,
            groupName: 1,
         },
      },
      {
         $group: {
            _id: { _id: "$_id", groupName: "$groupName" },
         },
      },
      {
         $project: {
            groupData: {
               groupName: "$_id.groupName",
               _id: "$_id._id",
            },
         },
      },
   ]);

   if (findAllGroupData) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         message: "All groups",
         groupInfo: findAllGroupData.length ? findAllGroupData : null,
      });
   } else {
      return res.status(httpStatusCodes.OK).json({
         success: false,
         message: "no group exists",
      });
   }
});

const getGroupUserInfo = catchAsync(async function (req, res, next) {
   const { groupId } = req.query;

   const groupWithUserInfo = await groupModel.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(groupId) } },
      { $unwind: "$groupUsers" },
      {
         $lookup: {
            from: "auths",
            localField: "groupUsers.userId",
            foreignField: "_id",
            as: "groupUsers.user",
         },
      },
      { $unwind: "$groupUsers.user" },
      {
         $group: {
            _id: {
               _id: "$_id",
               groupName: "$groupName",
            },
            groupUsers: { $push: "$groupUsers" },
         },
      },
      {
         $project: {
            _id: "$_id._id",
            groupName: "$_id.groupName",
            "groupUsers.userId": 1,
            "groupUsers._id": 1,
            "groupUsers.user.name": 1,
            "groupUsers.user.email": 1,
            "groupUsers.user.role": 1,
            "groupUsers.user.userProfile": 1,
         },
      },
   ]);

   if (groupWithUserInfo.length) {
      if (groupWithUserInfo) {
         return res.status(httpStatusCodes.OK).json({
            success: true,
            data: groupWithUserInfo[0],
         });
      } else {
         return res.status(httpStatusCodes.OK).json({
            success: false,
            message: "Group is not exists",
         });
      }
   } else {
      const findGroupInfo = await groupModel.findOne({ _id: groupId });

      if (findGroupInfo) {
         return res.status(httpStatusCodes.OK).json({
            success: true,
            data: {
               groupName: findGroupInfo?.groupName,
               _id: groupId,
               groupUsers: [],
            },
         });
      }
   }
});

const getUserDetails = catchAsync(async function (req, res, next) {
   const { userId } = req.query;
   const findUserInfo = await authModel.findOne({ _id: userId }, { password: 0, tokens: 0 });
   if (findUserInfo) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         userInfo: findUserInfo,
      });
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         success: false,
         message: "Internal server error",
      });
   }
});

module.exports = {
   postNewjob,
   getSingleJobPostDetails,
   updateJobPost,
   deleteSingleJobPost,
   getAllJobApplications,
   getSingleJobAplpication,
   downloadUserResume,
   getAllLoginUsers,
   updateUserRole,
   deleteUserAccount,
   getAllGroups,
   getGroupUserInfo,
   getUserDetails,
};
