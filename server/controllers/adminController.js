const { catchAsync } = require("../helpers/helper");
const jobPostModel = require("../model/schema/jobSchema");
const { httpStatusCodes, fetchPaginationData } = require("../helpers/helper");
const jobAppliedModel = require("../model/schema/jobAppliedSchema");
const { default: mongoose } = require("mongoose");
const path = require("path");
const authModel = require("../model/schema/authSchema");
const groupModel = require("../model/schema/groupSchema");
const forwordMessagesModel = require("../model/schema/forwordMessagesSchema");
const projectModel = require("../model/schema/projectsSchema");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");

const postNewjob = catchAsync(async function (req, res, next) {
   const insertedObject = { ...req.body };
   const jobTitle = req.body.jobTitle;

   const findJobPostIsExists = await jobPostModel.findOne({ jobTitle });

   if (findJobPostIsExists) {
      return res.status(httpStatusCodes.CREATED).json({
         success: false,
         message: "Job post already exists",
      });
   } else {
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
   const {
      postId,
      jobTitle,
      salaryRangeStart,
      salaryRangeEnd,
      jobType,
      jobCategory,
      positionDescription,
      metaData,
   } = req.body;

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
      { $and: [{ role: { $ne: "admin" } }] },
      { name: 1, email: 1, role: 1, userProfile: 1, createdAt: 1 }
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

const getAllNotifications = catchAsync(async function (req, res, next) {
   const findPinnedMessages = await forwordMessagesModel.aggregate([
      {
         $lookup: {
            from: "groups",
            localField: "groupId",
            foreignField: "_id",
            as: "groupInformation",
         },
      },
      {
         $lookup: {
            from: "auths",
            localField: "userId",
            foreignField: "_id",
            as: "userinformation",
         },
      },
      {
         $lookup: {
            from: "auths",
            localField: "employee",
            foreignField: "_id",
            as: "employeeInformation",
         },
      },
      { $unwind: "$userinformation" },
      { $unwind: "$groupInformation" },
      { $unwind: "$employeeInformation" },
      {
         $project: {
            _id: 1,
            groupId: 1,
            userId: 1,
            messageId: 1,
            createdAt: 1,
            message: {
               $arrayElemAt: [
                  "$groupInformation.groupMessages",
                  {
                     $indexOfArray: ["$groupInformation.groupMessages._id", "$messageId"],
                  },
               ],
            },
            employee: 1,
            groupInformation: 1,
            userinformation: 1,
            employeeInformation: 1,
         },
      },
      {
         $project: {
            _id: 1,
            createdAt: 1,
            groupName: "$groupInformation.groupName",
            groupId: "$groupInformation._id",
            pinnedUserId: "$userinformation._id",
            pinnedUserProfile: "$userinformation.userProfile",
            pinnedUserName: "$userinformation.name",
            message: "$message.message",
            messageId: "$messageId",
            userInfo: {
               _id: "$employeeInformation._id",
               name: "$employeeInformation.name",
               profilePic: "$employeeInformation.userProfile",
            },
         },
      },
      { $sort: { createdAt: -1 } },
   ]);

   if (findPinnedMessages) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         notifications: findPinnedMessages,
      });
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         success: false,
         message: "Internal server error",
      });
   }
});

const postNewProject = catchAsync(async function (req, res, next) {
   const updateObject = { ...req.body };
   const { name } = updateObject;
   const { clientBy } = req.body;

   if (!!clientBy) {
      updateObject.clientBy = {
         userId: clientBy,
      };
   }

   const findProjectIsExists = await projectModel.findOne({ name });

   const file = req?.files[0];

   if (findProjectIsExists) {
      return res.status(httpStatusCodes.OK).json({
         success: false,
         message: "Project is already exists",
      });
   } else {
      if (file) {
         const originalname = file?.originalname;
         const fileUniqueName = req.fileUniqueName;
         const imagePath = file.path;

         await sharp(imagePath)
            .resize({
               width: 300,
               height: 300,
            })
            .toFile(
               path.join(
                  __dirname,
                  "..",
                  "upload",
                  "attacthFiles",
                  "compressImages",
                  fileUniqueName
               )
            );

         const insertProjectData = await projectModel({
            ...updateObject,
            attachedImageDoc: fileUniqueName,
         }).save();

         if (insertProjectData) {
            return res.status(httpStatusCodes.OK).json({
               success: true,
               message: "Project saved",
            });
         }
      } else {
         // insert new project data
         const insertProjectData = await projectModel(updateObject).save();
         if (insertProjectData) {
            return res.status(httpStatusCodes.OK).json({
               success: true,
               message: "Project saved",
            });
         }
      }
   }
});

const getAllProject = catchAsync(async function (req, res, next) {
   const { page } = req.query;

   const DOCUMENT_LIMIT = 50;

   const totalDocuments = await projectModel.countDocuments();

   const findProjects = await projectModel
      .find({})
      .populate("clientBy.userId", { _id: 1, name: 1 })
      .sort({ createdAt: -1 })
      .skip(page * DOCUMENT_LIMIT)
      .limit(DOCUMENT_LIMIT);

   if (findProjects) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         totalPages: Math.ceil(totalDocuments / DOCUMENT_LIMIT - 1),
         totalDocuments,
         projects: findProjects,
      });
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         success: false,
         message: "Internal server error",
      });
   }
});

const deleteJobProject = catchAsync(async function (req, res, next) {
   const { jobId } = req.query;

   if (!jobId)
      return res.status(httpStatusCodes.OK).json({
         success: false,
         message: "Project id is required",
      });

   const findProjectAndDelete = await projectModel.deleteOne({ _id: jobId });

   if (!!findProjectAndDelete.deletedCount) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         message: "Project deleted",
         jobId,
      });
   } else {
      return res.status(httpStatusCodes.NOT_FOUND).json({
         success: false,
         message: "someting worng",
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
   getAllNotifications,
   postNewProject,
   getAllProject,
   deleteJobProject,
};
