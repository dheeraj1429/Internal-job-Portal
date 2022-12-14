const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const authSchema = new mongoose.Schema({
   name: { type: String, required: [true, "user name is required"] },
   email: {
      type: String,
      required: [true, "user email is required"],
      unique: true,
   },
   password: {
      type: String,
      required: [true, "user account password is required"],
   },
   role: { type: String, default: "employee" },
   userProfile: { type: String, default: "default-user-pic.jpg" },
   createdAt: { type: Date, default: Date.now },
   token: { type: String },
   phone: { type: Number },
   street: { type: String },
   cityState: { type: String },
   postalCode: { type: Number },
   showNumber: { type: Boolean, default: false },
   bio: { type: String },
   headline: { type: String },
   objective: { type: String },
   year: { type: Number },
   month: { type: String },
   date: { type: Number },
   eligibility: { type: String },
   industry: { type: String },
   experience: { type: Number },
   careerLevel: { type: String },
   resume: { type: String },
   skills: [{ skill: { type: String }, yearOfExperience: { type: String } }],
});

authSchema.index({ email: 1 });

// user token genrate
authSchema.methods.genrateUserToken = async function () {
   try {
      // genrate the user token
      const token = jwt.sign(
         { _id: this._id.toString(), name: this.name, email: this.email },
         SECRET_KEY
      );
      // store user tokne in database
      this.token = token;
      this.save();
      return token;
   } catch (err) {
      console.log(err);
   }
};

// hash password
authSchema.pre("save", async function (next) {
   try {
      if (this.isModified("password")) {
         const hashPassword = await bcryptjs.hash(this.password, 11);
         this.password = hashPassword;
      }
      next();
   } catch (err) {
      console.log(err);
   }
});

const authModel = mongoose.model("auth", authSchema);

module.exports = authModel;
