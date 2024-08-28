const express = require("express");
const applicationRouter = express.Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const { employerGetAllApplication, jobSeekerGetAllApplications, deleteApplication, postApplication } = require("../controller/application");

applicationRouter.route("/postApplication/:id").post(isLoggedIn,postApplication);
applicationRouter.route("/employerApplications").get(isLoggedIn,employerGetAllApplication);
applicationRouter.route("/jobSeekerApplications").get(isLoggedIn,jobSeekerGetAllApplications);
applicationRouter.route("/deleteApplication/:id").delete(isLoggedIn,deleteApplication);


module.exports=applicationRouter;