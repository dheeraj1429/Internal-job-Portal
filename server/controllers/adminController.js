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

module.exports = {
   postNewjob,
};
