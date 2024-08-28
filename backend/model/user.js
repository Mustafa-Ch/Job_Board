const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Full Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already exist"],
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  role: {
    type: String,
    required: true,
    enum: ["Employer", "Job Seeker"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [8, "Password must contain at leaast 8 characters"],
  },
  phone: {
    type: Number,
  },
  avatar: {
    public_id: String,
    url: String,
  },
  resume: {
    public_id: String,
    url: String,
  },
  address: {
    type: String,
    required: true,
  },
  coverLetter: {
    type: String,
  },
  niches: {
    firstNiche: String,
    secondNiche: String,
    thirdNiche: String,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordTokenExpire: {
    type: Date,
  },
  isVerified: {
    type: Boolean
  },
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
