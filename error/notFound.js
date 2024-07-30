const AppError = require("./AppError");
const { StatusCodes } = require("http-status-codes");

function notFound() {
  throw new AppError("Resource not found", StatusCodes.NOT_FOUND);
}

module.exports = notFound;
