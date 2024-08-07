const { badRequest } = require("../../../../error");
const createUser = require("../../../../lib/user/createUser");
const { User } = require("../../../../models");
const { isValidEmail, catchAsync } = require("../../../../utils");

const register = catchAsync((req, res, next) => {
  const { name, email, password, avatar, role } = req.body;
  if (!name || !email || !password) {
    badRequest("One or more credentials are missing");
  }

  const user = createUser({ name, email, password, avatar, role });
});

module.exports = register;
