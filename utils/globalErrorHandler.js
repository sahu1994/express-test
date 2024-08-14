AppError = require("../utils/AppError");

const globalErrorHandler = (err, req, res, next) => {
  if (err.isOperational) {
    return res
      .status(err.statusCode)
      .json({ status: err.statusCode, message: err.message });
  }

  if (err.code === 11000) {
    const value = err.keyValue[Object.keys(err.keyValue)[0]];
    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new AppError(message, 400);
  }
  
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((el) => el.message);
    const message = `Invalid input data. ${errors.join(". ")}`;
    return new AppError(message, 400);
  }

  return res.status(500).json({
    status: "fail",
    message: err.message,
  });
};

module.exports = globalErrorHandler;
