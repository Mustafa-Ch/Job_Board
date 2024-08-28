const ErrorHandler=require('../utils/ErrorHandler');


const isEmployer = async (...roles) => {
  return (req,res,next)=>{
    if(!roles.includes(req.user.role)){
        return next(new ErrorHandler(`${req.user.role} is not authorized to access this resourse`,400));
    }
    next();
  }
};
module.exports=isEmployer;
