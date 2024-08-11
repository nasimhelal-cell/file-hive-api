const { StatusCodes } = require("http-status-codes");
const authServices = require("@/lib/auth");
const { catchAsync } = require("@/utils");

const register = catchAsync(async (req, res) => {
  const { username, email, password, avatar, role } = req.body;

  let user = await authServices.register({
    username,
    email,
    password,
    avatar,
    role,
  });

  const response = {
    code: StatusCodes.CREATED,
    message: "User registered successfully",
    data: user,
  };

  res.status(StatusCodes.CREATED).json(response);
});

module.exports = register;
