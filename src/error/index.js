const badRequest = require("./badRequest");
const { defaultError } = require("./defaultError");
const forbidden = require("./forbidden");
const notFound = require("./notFound");
const unauthorized = require("./unauthorized");

const error = {
  defaultError,
  notFound,
  badRequest,
  unauthorized,
  forbidden,
};

module.exports = error;
