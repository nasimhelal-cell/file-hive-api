const { StatusCodes } = require("http-status-codes");

const logout = (req, res) => {
  const response = {
    code: StatusCodes.OK,
    message: "Logout successful",
  };
  res.status(StatusCodes.OK).json(response);
};

module.exports = logout;
