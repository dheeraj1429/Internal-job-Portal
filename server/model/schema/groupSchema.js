const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
   groupName: { type: String, required: [true, "please enter group name"] },
   groupUsers: [
      {
         userId: { type: mongoose.Types.ObjectId, ref: "auth" },
      },
   ],
   groupMessages: [
      {
         userId: { type: mongoose.Types.ObjectId, ref: "auth" },
         message: { type: String, required: [true, "message is required"] },
         userRemoved: { type: Boolean, default: false },
         userAdded: { type: Boolean, default: false },
         createdAt: { type: Date, default: Date.now },
      },
   ],
   createdAt: { type: Date, default: Date.now },
});

groupSchema.index({ groupName: 1 });

const groupModel = mongoose.model("group", groupSchema);

module.exports = groupModel;
