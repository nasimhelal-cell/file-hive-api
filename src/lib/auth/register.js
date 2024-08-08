const { badRequest } = require("../../error");
const { createUser, findUser } = require("../user");
const encryptPassword = require("./encryptPassword");

const register = async ({ username, email, password, avatar, role }) => {
  if (!username || !email || !password) {
    return badRequest("One or more credentials are missing");
  }

  const isUserExist = await findUser({ email });
  if (isUserExist) {
    return badRequest("User already exists, Try with another email");
  }

  const encryptedPassword = await encryptPassword(password);

  const newUser = await createUser({
    username,
    email,
    password: encryptedPassword,
    avatar,
    role,
  });
  return newUser._doc;
};

module.exports = register;
