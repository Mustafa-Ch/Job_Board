const ErrorHandler = require("../utils/ErrorHandler");

const errorMiddleware = (err, req, res, next) => {
  // Set default values for error properties
  const statusCode = err.statusCode ||500;
  const success = err.success || false;
  const message = err.message || "Internal Server Error";
  const data = err.data || null;
  const errors = err.errors || null;

  // Handle specific MongoDB duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    return res.status(400).json({
      success: false,
      message,
      data: null,
      errors: null,
    });
  }

  // Handle specific JWT errors
  if (err.name === "JsonWebTokenError") {
    const message = "JSON Web Token is invalid. Try again.";
    return res.status(400).json({
      success: false,
      message,
      data: null,
      errors: null,
    });
  }

  if (err.name === "TokenExpiredError") {
    const message = "Your JSON token has expired. Try again.";
    return res.status(400).json({
      success: false,
      message,
      data: null,
      errors: null,
    });
  }

  // Default error response
  return res.status(statusCode).json({
    success,
    message,
    data,
    errors,
  });
};

module.exports = errorMiddleware;
