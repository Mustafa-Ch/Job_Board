const express = require("express");
const userRouter = express.Router();
const {
  createUser,
  loginUser,
  logoutUser,
  getUser,
  updateMyProfile,
  updatePassword,
  deleteUser,
  forgotPassword,
  resetPassword,
  sendVerifiedMail,
  mailVerification,
} = require("../controller/user");
const isLoggedIn = require("../middleware/isLoggedIn");
const upload = require("../middleware/multer");

userRouter.route("/createUser").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  createUser
);
userRouter.route("/loginUser").post(loginUser);
userRouter.route("/logoutUser").get(isLoggedIn, logoutUser);
userRouter.route("/getUser").get(isLoggedIn, getUser);
userRouter.route("/updatePassword").put(isLoggedIn, updatePassword);
userRouter.route("/forgotPassword").post(forgotPassword);
userRouter.route("/resetPassword/:token").put(resetPassword);
userRouter.route("/verifiedMail").get(isLoggedIn,sendVerifiedMail);
userRouter.route("/mailVerification/:id").put(isLoggedIn,mailVerification);
userRouter.route("/deleteUser").delete(isLoggedIn,deleteUser);
userRouter.route("/updateUser").put(
  isLoggedIn,
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  updateMyProfile
);

module.exports = userRouter;
