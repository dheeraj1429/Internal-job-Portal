const { catchAsync } = require('../helpers/helper');
const jobPostModel = require('../model/schema/jobSchema');
const { httpStatusCodes } = require('../helpers/helper');

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

module.exports = {
   postNewjob,
   getSingleJobPostDetails,
   updateJobPost,
   deleteSingleJobPost,
};
