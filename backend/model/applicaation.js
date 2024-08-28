const mongoose = require("mongoose");
const validator = require("validator");

const applicationSchema = mongoose.Schema({
  jobSeekerInfo: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    phone: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    resume: {
      public_id: String,
      url: String,
    },
    coverLetter: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Job Seeker"],
      required: true,
    },
  },
  employerInfo: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["Employer"],
      required: true,
    },
  },
  jobInfo: {
    jobId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Jobs",
        required:true
    },
    jobTitle:{
        type:String,
        required:true
    }
  },
  deletedBy:{
    job_seeker:{
        type:Boolean,
        default:false
    },
    employer:{
        type:Boolean,
        default:false
    },
  }
});


const applicationModel=mongoose.model('Application',applicationSchema);
module.exports=applicationModel;