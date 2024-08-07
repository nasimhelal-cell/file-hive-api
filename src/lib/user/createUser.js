const { userDefault } = require("../../config");
const { User } = require("../../models");

const createUser = ({
  name,
  email,
  password,
  avatar,
  role = userDefault.role,
}) => {
  const user = new User({ name, email, password, avatar, role });
  return user.save();
};

module.exports = createUser;
