const AppError = require("./AppError");
const { StatusCodes } = require("http-status-codes");

function badRequest() {
  throw new AppError("Resource not found", StatusCodes.BAD_REQUEST);
}

module.exports = badRequest;
