const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");
const User=require('../model/user');
const isLoggedIn =async (req, res, next) => {
  try{
    const { token } = req.cookies;
    if (!token) {
      return next(
        new ErrorHandler("You are not authorized to access this resource", 400)
      );
    }
    const decodeToken =await jwt.verify(token,process.env.JSON_WEB_TOKEN_SECRET);
    const user=await User.findOne({_id:decodeToken._id});
    req.user=user;
    return next();
  }catch(error){
     return next(new ErrorHandler(error.message,400));
  }
};

module.exports=isLoggedIn;
