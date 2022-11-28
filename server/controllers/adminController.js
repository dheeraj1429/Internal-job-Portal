const { catchAsync } = require('../helpers/helper');
const jobPostModel = require('../model/schema/jobSchema');
const { httpStatusCodes } = require('../helpers/helper');
const jobAppliedModel = require('../model/schema/jobAppliedSchema');
const { default: mongoose } = require('mongoose');

const postNewjob = catchAsync(async function (req, res, next) {
   const insertedObject = { ...req.body };
   const updatePost = await jobPostModel(insertedObject).save();
   if (updatePost) {
      return res.status(httpStatusCodes.CREATED).json({
         success: true,
         message: 'New job post uploded',
      });
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         success: false,
         message: 'Internal server error',
      });
   }
});

const getSingleJobPostDetails = catchAsync(async function (req, res, next) {
   const { postId } = req.query;
   if (!postId) {
      throw new Error('job post id is required!');
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
         message: 'Post is not exits',
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
      throw new Error('job post id is required!');
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
         message: 'Post updated',
      });
   } else {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         message: 'Post update already',
      });
   }
});

const deleteSingleJobPost = catchAsync(async function (req, res, next) {
   const { postId } = req.query;
   if (!postId) {
      throw new Error('job post id is required!');
   }
   const deleteSinglePost = await jobPostModel.deleteOne({ _id: postId });
   if (!!deleteSinglePost.deletedCount) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         message: 'Job post deleted',
         deletePostId: postId,
      });
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         success: false,
         message: 'internal serer error',
      });
   }
});

const getAllJobApplications = catchAsync(async function (req, res, next) {
   // pagination effect
   const { page } = req.query;

   const jobResponse = await jobAppliedModel.aggregate([
      {
         $lookup: {
            from: 'jobposts',
            localField: 'jobId',
            foreignField: '_id',
            as: 'jobApplied',
         },
      },
      {
         $lookup: {
            from: 'auths',
            localField: 'userId',
            foreignField: '_id',
            as: 'user',
         },
      },
      {
         $project: {
            _id: 1,
            reference: 1,
            notes: 1,
            referenecResume: 1,
            jobApplied: { $arrayElemAt: ['$jobApplied', 0] },
            user: { $arrayElemAt: ['$user', 0] },
         },
      },
      {
         $project: {
            _id: 1,
            reference: 1,
            notes: 1,
            referenecResume: 1,
            'jobApplied._id': 1,
            'jobApplied.jobTitle': 1,
            'jobApplied.salaryRangeStart': 1,
            'jobApplied.salaryRangeEnd': 1,
            'user._id': 1,
            'user.name': 1,
            'user.email': 1,
            'user.userProfile': 1,
            'user.cityState': 1,
            'user.phone': 1,
            'user.postalCode': 1,
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
         message: 'Internal server error',
      });
   }
});

const getSingleJobAplpication = catchAsync(async function (req, res, next) {
   const { jobId } = req.query;

   const SingleJobApplicationResponse = await jobAppliedModel.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(jobId) } },
      {
         $lookup: {
            from: 'jobposts',
            localField: 'jobId',
            foreignField: '_id',
            as: 'jobApplied',
         },
      },
      {
         $lookup: {
            from: 'auths',
            localField: 'userId',
            foreignField: '_id',
            as: 'user',
         },
      },
      {
         $project: {
            _id: 1,
            reference: 1,
            notes: 1,
            referenecResume: 1,
            candidateName: 1,
            candidateNumber: 1,
            referenecResume: 1,
            jobApplied: { $arrayElemAt: ['$jobApplied', 0] },
            user: { $arrayElemAt: ['$user', 0] },
         },
      },
      {
         $project: {
            _id: 1,
            reference: 1,
            notes: 1,
            referenecResume: 1,
            candidateName: 1,
            candidateNumber: 1,
            referenecResume: 1,
            'jobApplied._id': 1,
            'jobApplied.jobTitle': 1,
            'jobApplied.salaryRangeStart': 1,
            'jobApplied.salaryRangeEnd': 1,
            'jobApplied.jobType': 1,
            'jobApplied.jobCategory': 1,
            'user._id': 1,
            'user.name': 1,
            'user.email': 1,
            'user.userProfile': 1,
            'user.cityState': 1,
            'user.phone': 1,
            'user.postalCode': 1,
            'user.street': 1,
            'user.careerLevel': 1,
            'user.eligibility': 1,
            'user.experience': 1,
            'user.industry': 1,
            'user.skills': 1,
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
         message: 'Internal server error',
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
};
