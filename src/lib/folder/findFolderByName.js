const { Folder } = require("@/models");

const findFolderByName = async ({ name }) => {
  const folder = await Folder.findOne({ name });
  return folder ? folder._doc : false;
};

module.exports = findFolderByName;
