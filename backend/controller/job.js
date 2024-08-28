const Job = require("../model/job");
const ErrorHandler = require("../utils/ErrorHandler");

const postJob = async (req, res, next) => {
  try {
    const {
      title,
      description,
      location,
      job_type,
      company_name,
      introduction,
      responsibilities,
      salary,
      offers,
      qualifications,
      hiring_multiple_candidates,
      job_niche,
    } = req.body;
    if (
      !title ||
      !description ||
      !location ||
      !job_type ||
      !company_name ||
      !salary ||
      !qualifications ||
      !job_niche ||
      !responsibilities
    ) {
      return next(new ErrorHandler("Please Provide Full Job Details", 400));
    }
    console.log(
      title,
      description,
      location,
      job_type,
      company_name,
      salary,
      qualifications,
      job_niche,
      responsibilities
    );
    if (req.user.role !== "Employer") {
      return next(
        new ErrorHandler("Job Seeker cannot access this resource", 400)
      );
    }

    const job = await Job.create({
      title,
      description,
      location,
      job_type,
      company_name,
      introduction,
      responsibilities,
      salary,
      offers,
      qualifications,
      hiring_multiple_candidates,
      job_niche,
      job_posted: Date.now(),
      posted_by: req.user._id,
    });

    return res.status(200).json({
      success: true,
      message: "Job post successfully",
      job,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const getAllJobs = async (req, res, next) => {
  try {
    const { niche, city, searchKeyword } = req.query;
    const query = {};
    if (city) {
      query.location = city;
    }
    if (niche) {
      query.jobNiche = niche;
    }
    if (searchKeyword) {
      query.$or = [
        { title: { $regex: searchKeyword, $options: "i" } },
        { company_name: { $regex: searchKeyword, $options: "i" } },
        { job_type: { $regex: searchKeyword, $options: "i" } },
      ];
    }

    const jobs = await Job.find(query);
    return res.status(200).json({
      success: true,
      message: "Here are your all jobs",
      jobs,
      count: jobs.length,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const getMyJobs = async (req, res, next) => {
  try {
    const myJobs = await Job.find({ posted_by: req.user._id });
    if (!myJobs) {
      return next(new ErrorHandler("Your jobs is not found", 400));
    }
    return res.status(200).json({
      success: true,
      message: "Here are your all jobs",
      myJobs,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const deleteJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);
    if (!job) {
      return next(new ErrorHandler("Job not found!", 404));
    }
    await job.deleteOne();
    return res.status(200).json({
      success: true,
      message: "Job deleted Successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const getSingleJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);
    if (!job) {
      return next(new Errorhandler("Job not found", 404));
    }
    return res.status(200).json({
      success: true,
      message: "Here are your job",
      job,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

module.exports = {
  postJob,
  getAllJobs,
  getMyJobs,
  deleteJob,
  getSingleJob,
};
