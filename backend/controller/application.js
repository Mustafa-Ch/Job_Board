const ErrorHandler = require("../utils/ErrorHandler");
const Application = require("../model/applicaation");
const Job = require("../model/job");
const fileUploadOnCloudinary = require("../utils/cloudinary");

const postApplication = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phone, address, coverLetter } = req.body;

    if (!name || !email || !phone || !address || !coverLetter) {
      return next(new ErrorHandler("All fields are required..."));
    }
    console.log(name, email, phone, address, coverLetter);

    if (phone.length > 11 || phone.length < 11) {
      return next(new ErrorHandler("Please provide a valid phone number", 400));
    }

    const jobSeekerInfo = {
      id: req.user._id,
      name,
      email,
      phone,
      address,
      coverLetter,
      role: "Job Seeker",
    };

    const isAlreadyApplied = await Application.findOne({
      "jobSeekerInfo.id": req.user.id,
      "jobInfo.jobId": id,
    });
    if (isAlreadyApplied) {
      return next(
        new ErrorHandler("You have already applied for this job", 400)
      );
    }

    const jobDetails = await Job.findById(id);

    if (!jobDetails) {
      return next(new ErrorHandler("Job not found!", 400));
    }
    if (req.file) {
      const resume = await fileUploadOnCloudinary(req.file.path);
      if (!resume || resume.error) {
        return next(new ErrorHandler("Failed to upload resume on cloudinary"));
      }
      jobSeekerInfo.resume = {
        public_id: resume.public_id,
        url: resume.secure_url,
      };
    } else {
      if (!req.user.resume.url) {
        return next(new ErrorHandler("Please provide your resume", 400));
      }
      jobSeekerInfo.resume = {
        public_id: req.user.resume.public_id,
        url: req.user.resume.url,
      };
    }

    const jobInfo = {
      jobId: id,
      jobTitle: jobDetails.title,
    };
    const employerInfo = {
      id: req.user._id,
      role: "Employer",
    };

    const application = await Application.create({
      jobSeekerInfo,
      employerInfo,
      jobInfo,
    });

    return res.status(200).json({
      success: true,
      message: "Your Application Submitted Successfully",
      application,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const employerGetAllApplication = async (req, res, next) => {
  try {
    const applications = await Application.find({
      "employerInfo.id": req.user._id,
      "deletedBy.employer": false,
    });
    if (!applications) {
      return next(new ErrorHandler("Applications Not Found!"));
    }
    return res.status(200).json({
      success: true,
      message: "Here your all applications",
      applications,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const jobSeekerGetAllApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({
      "jobSeekerInfo.id": req.user._id,
      "deletedBy.job_seeker": false,
    });

    if (!applications) {
      return next(new ErrorHandler("Applications not found!", 404));
    }

    return res.status(200).json({
      success: true,
      message: "Here are your all applications",
      applications,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const deleteApplication = async (req, res, next) => {
  try {
    const { id } = req.params;
    const application = await Application.findById(id);
    if (!application) {
      return next(new ErrorHandler("Application not found!", 404));
    }
    if (req.user.role === "Employer") {
      application.deletedBy.employer = true;
    } else if (req.user.role === "Job Seeker") {
      application.deletedBy.job_seeker = true;
    }

    await application.save();

    if (
      application.deletedBy.job_seeker === true &&
      application.deletedBy.employer === true
    ) {
      await application.deleteOne();
    }

    return res.status(200).json({
      success: true,
      message: "Your Application deleted successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

module.exports = {
  postApplication,
  employerGetAllApplication,
  jobSeekerGetAllApplications,
  deleteApplication,
};
