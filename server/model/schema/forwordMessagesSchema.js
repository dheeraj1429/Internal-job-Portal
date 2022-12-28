const mongoose = require("mongoose");

const forwordMessagesSchema = new mongoose.Schema({
   groupId: { type: mongoose.Types.ObjectId, ref: "group" },
   userId: { type: mongoose.Types.ObjectId, ref: "auth" },
   messageId: { type: mongoose.Types.ObjectId, ref: "group" },
   employee: { type: mongoose.Types.ObjectId, ref: "auth" },
   createdAt: { type: Date, default: Date.now },
});

const forwordMessagesModel = mongoose.model("forwordMessages", forwordMessagesSchema);

module.exports = forwordMessagesModel;
