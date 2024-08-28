const express = require("express");
const jobRouter = express.Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const {
  postJob,
  getAllJobs,
  getMyJobs,
  deleteJob,
  getSingleJob,
} = require("../controller/job");

jobRouter.route("/postJob").post(isLoggedIn, postJob);
jobRouter.route("/getAllJobs").get(getAllJobs);
jobRouter.route("/getMyJobs").get(isLoggedIn, getMyJobs);
jobRouter.route("/deleteJob/:id").delete(isLoggedIn, deleteJob);
jobRouter.route("/getSingleJob/:id").get(isLoggedIn, getSingleJob);

module.exports = jobRouter;
