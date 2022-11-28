const mongoose = require('mongoose');
const jobAppliedSchema = new mongoose.Schema({
   jobId: { type: mongoose.Types.ObjectId, ref: 'jobPost' },
   userId: { type: mongoose.Types.ObjectId, ref: 'auth' },
   reference: { type: Boolean },
   notes: { type: String },
   candidateName: { type: String },
   candidateNumber: { type: String },
   referenceResume: { type: String },
   createdAt: { type: Date, default: Date.now },
});

const jobAppliedModel = mongoose.model('jobApplications', jobAppliedSchema);

module.exports = jobAppliedModel;
