const { userDefault } = require("@/config");
const { User } = require("@/models");

const createUser = ({
  username,
  email,
  password,
  avatar = userDefault.avatar,
  role = userDefault.role,
}) => {
  const user = new User({ username, email, password, avatar, role });

  return user.save();
};

module.exports = createUser;
