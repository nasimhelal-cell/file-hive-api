const AppError = require("./AppError");
const { StatusCodes } = require("http-status-codes");

function unauthorized() {
  throw new AppError("User is not authorized", StatusCodes.UNAUTHORIZED);
}

module.exports = unauthorized;
