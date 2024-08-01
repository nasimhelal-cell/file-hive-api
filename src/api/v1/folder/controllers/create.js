const { Folder } = require("../../../../models");

const create = async (req, res) => {
  const { name, parentID, path } = req.body;
  console.log(req.user);
  const folder = new Folder({
    name,
    parentID,
    path,
    userID: "66815a94e25007f4e4513097",
  });

  await folder.save();
  res.json({ m: "nasim" });
};

module.exports = create;
