const { StatusCodes, ReasonPhrase } = require("http-status-codes");

const DBValidationError = require("./DBValidationError");

function defaultError(error, _req, res, _next) {
  error.code = error.code || StatusCodes.INTERNAL_SERVER_ERROR;
  error.constant = error.constant || "error";
  error.message =
    error.message || ReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR);

  if (error.name === "ValidationError") {
    error = DBValidationError(error);
  }

  const errorResponse = {
    code: error.code,
    constant: error.constant,
    message: error.message,
  };

  res.status(error.code).json(errorResponse);
}

module.exports = { defaultError };
