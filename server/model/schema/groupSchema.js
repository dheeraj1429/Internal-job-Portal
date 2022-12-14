const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
   groupName: { type: String, required: [true, "please enter group name"] },
   groupUsers: [
      {
         userId: { type: mongoose.Types.ObjectId, ref: "auth" },
         userName: { type: String },
         userEmail: { type: String },
         userProfile: { type: String },
      },
   ],
});

groupSchema.index({ groupName: 1 });

const groupModel = mongoose.model("group", groupSchema);

module.exports = groupModel;
