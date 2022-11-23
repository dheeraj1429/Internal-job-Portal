const { catchAsync } = require('../helpers/helper');
const jobPostModel = require('../model/schema/jobSchema');
const { httpStatusCodes } = require('../helpers/helper');

const getAllJobPosts = catchAsync(async function (req, res, next) {
   const allJobs = await jobPostModel.find({}, { metaData: 0 });
   if (allJobs) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         allJobs,
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
};
