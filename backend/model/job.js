const mongoose = require("mongoose");

const jobSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  job_type: {
    type: String,
    required: true,
    enum: ["Full_Time", "Part_Time"],
  },
  company_name: {
    type: String,
    required: true,
  },
  introduction: {
    type: String,
  },
  responsibilities: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  offers: {
    type: String,
  },
  qualifications:{
    type:String,
    required:true
  },
  hiring_multiple_candidates:{
    type:String,
    default:"No",
    enum:["Yes","No"]
  },
  job_niche:{
    type:String,
    required:true
  },
  job_posted:{
    type:Date,
    default:Date.now
  },
  posted_by:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  news_letter_sent:{
    type:Boolean,
    default:false
  }
});

const jobModel=mongoose.model('Jobs',jobSchema);
module.exports=jobModel;