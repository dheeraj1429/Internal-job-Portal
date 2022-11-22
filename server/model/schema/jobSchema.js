const mongoose = require('mongoose');

const jobModelSchema = new mongoose.Schema({
   jobTitle: { type: String, reuqired: [true, 'job title is required'] },
   salaryRange: { type: Number, reuqired: [true, 'job salary range is required'] },
   jobType: { type: String, required: [true, 'Job type is required'] },
   jobCategory: { type: String },
   positionDescription: { type: String },
   metaData: { type: String },
});

const jobPostModel = mongoose.model('jobPost', jobModelSchema);

module.exports = jobPostModel;
