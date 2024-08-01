const { User } = require("../../../../models");

const register = async (req, res) => {
  console.log("nasim");
  const { name, email, password, avatar, role } = req.body;
  const user = new User({ name, email, password, avatar, role });
  res.end();
  await user.save();
};

module.exports = register;
