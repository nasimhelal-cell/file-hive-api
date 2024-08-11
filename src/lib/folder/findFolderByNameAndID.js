const { Folder } = require("@/models");

const findFolderByNameAndID = async ({ name, parentID }) => {
  const folder = await Folder.findOne({ name, parentID });
  return folder ? folder._doc : false;
};

module.exports = findFolderByNameAndID;
