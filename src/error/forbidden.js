const AppError = require("./AppError");
const { StatusCodes } = require("http-status-codes");

function forbidden() {
  throw new AppError("Permission denied", StatusCodes.FORBIDDEN);
}

module.exports = forbidden;
