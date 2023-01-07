const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
   name: { type: String, required: [true, "Please enter project name"] },
   service: { type: String, required: [true, "Please enter service name"] },
   clientName: { type: String, required: [true, "Please enter project client name"] },
   description: { type: String },
   clientBy: {
      userId: { type: mongoose.Types.ObjectId, ref: "auth" },
   },
   clientEmail: { type: String, required: [true, "Please enter client email"] },
   clientNumber: { type: Number, required: [true, "Please enter client number"] },
   clientAddress: { type: String },
   ProjectDateStart: { type: Date, required: [true, "Project start date is required"] },
   ProjectDateEnd: { type: Date, required: [true, "Project end date is required"] },
   createdAt: { type: Date, default: Date.now },
   attachedImageDoc: { type: String },
});

projectSchema.index({ name: 1 });

const projectModel = mongoose.model("project", projectSchema);

module.exports = projectModel;
