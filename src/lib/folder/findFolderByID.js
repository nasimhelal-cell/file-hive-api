const { Folder } = require("@/models");

const findFolderByID = async ({ ID }) => {
  const folder = await Folder.findById(ID);
  return folder ? folder._doc : false;
};

module.exports = findFolderByID;
