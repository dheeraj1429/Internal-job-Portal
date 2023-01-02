const mongoose = require("mongoose");

const jobModelSchema = new mongoose.Schema({
   jobTitle: { type: String, reuqired: [true, "job title is required"] },
   salaryRangeStart: { type: Number, reuqired: [true, "job salary range is required"] },
   salaryRangeEnd: { type: Number, reuqired: [true, "job salary range is required"] },
   jobType: { type: String, required: [true, "Job type is required"] },
   jobCategory: { type: String },
   positionDescription: { type: String },
   metaData: { type: String },
   userApplied: [
      {
         user: { type: mongoose.Types.ObjectId, ref: "auth" },
         reference: { type: Boolean },
         notes: { type: String },
         referenceResume: { type: String },
         createdAt: { type: Date, default: Date.now },
      },
   ],
   createdAt: { type: Date, default: Date.now },
});

jobModelSchema.index({ jobTitle: 1 });

const jobPostModel = mongoose.model("jobPost", jobModelSchema);

module.exports = jobPostModel;
