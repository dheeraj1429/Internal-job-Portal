const mongoose = require("mongoose");

const forwordProjectsSchema = new mongoose.Schema({
   userId: { type: mongoose.Types.ObjectId, ref: "auth" },
   projectId: { type: mongoose.Types.ObjectId, ref: "project" },
   createdAt: { type: Date, default: Date.now },
   clientBy: { type: mongoose.Types.ObjectId, ref: "auth" },
});

forwordProjectsSchema.index({ projectId: 1 });

const forwordProjectsModel = mongoose.model("forwordProject", forwordProjectsSchema);

module.exports = forwordProjectsModel;
